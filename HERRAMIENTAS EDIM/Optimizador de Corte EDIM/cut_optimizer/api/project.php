<?php
require 'config.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'save':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) jsonResponse(false, 'Datos invalidos');

        $db = getDB();
        $proj = $input['project'] ?? [];
        $id = $proj['id'] ?? null;

        if ($id) {
            $stmt = $db->prepare("UPDATE projects SET name=?, client=?, company=?, operator=?, date=?, material=?, thickness=?, unit=?, notes=?, config=? WHERE id=?");
            $stmt->execute([$proj['name'], $proj['client'], $proj['company'], $proj['operator'], $proj['date'], $proj['material'], $proj['thickness'], $proj['unit'], $proj['notes'], json_encode($input['config'] ?? []), $id]);
        } else {
            $stmt = $db->prepare("INSERT INTO projects (name, client, company, operator, date, material, thickness, unit, notes, config) VALUES (?,?,?,?,?,?,?,?,?,?)");
            $stmt->execute([$proj['name'], $proj['client'], $proj['company'], $proj['operator'], $proj['date'], $proj['material'], $proj['thickness'], $proj['unit'], $proj['notes'], json_encode($input['config'] ?? [])]);
            $id = $db->lastInsertId();
        }

        $db->prepare("DELETE FROM plates WHERE project_id=?")->execute([$id]);
        foreach ($input['plates'] ?? [] as $p) {
            $db->prepare("INSERT INTO plates (project_id, quantity, length, width, thickness, cost, supplier, code, color, notes) VALUES (?,?,?,?,?,?,?,?,?,?)")
                ->execute([$id, $p['quantity'] ?? 1, $p['length'], $p['width'], $p['thickness'] ?? 18, $p['cost'] ?? 0, $p['supplier'] ?? '', $p['code'] ?? '', $p['color'] ?? '', $p['notes'] ?? '']);
        }

        $db->prepare("DELETE FROM pieces WHERE project_id=?")->execute([$id]);
        foreach ($input['pieces'] ?? [] as $p) {
            $db->prepare("INSERT INTO pieces (project_id, quantity, name, code, length, width, thickness, priority, material, notes, color, allow_rotation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
                ->execute([$id, $p['quantity'] ?? 1, $p['name'] ?? '', $p['code'] ?? '', $p['length'], $p['width'], $p['thickness'] ?? 18, $p['priority'] ?? 1, $p['material'] ?? '', $p['notes'] ?? '', $p['color'] ?? '', ($p['allowRotation'] ?? true) ? 1 : 0]);
        }

        jsonResponse(true, 'Proyecto guardado', ['id' => $id]);
        break;

    case 'list':
        $db = getDB();
        $stmt = $db->query("SELECT id, name, client, date FROM projects ORDER BY updated_at DESC");
        jsonResponse(true, '', $stmt->fetchAll());
        break;

    case 'get':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) jsonResponse(false, 'ID requerido');
        $db = getDB();
        $proj = $db->prepare("SELECT * FROM projects WHERE id=?"); $proj->execute([$id]); $project = $proj->fetch();
        if (!$project) jsonResponse(false, 'No encontrado');

        $plates = $db->prepare("SELECT * FROM plates WHERE project_id=?"); $plates->execute([$id]);
        $pieces = $db->prepare("SELECT * FROM pieces WHERE project_id=?"); $pieces->execute([$id]);

        $project['config'] = json_decode($project['config'] ?? '{}', true);

        $platesData = $plates->fetchAll();
        $piecesData = $pieces->fetchAll();
        foreach ($piecesData as &$pc) { $pc['allowRotation'] = (bool)$pc['allow_rotation']; unset($pc['allow_rotation']); }

        jsonResponse(true, '', [
            'project' => $project,
            'plates' => $platesData,
            'pieces' => $piecesData
        ]);
        break;

    case 'delete':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) jsonResponse(false, 'ID requerido');
        getDB()->prepare("DELETE FROM projects WHERE id=?")->execute([$id]);
        jsonResponse(true, 'Proyecto eliminado');
        break;

    default:
        jsonResponse(false, 'Accion no valida');
}
?>
