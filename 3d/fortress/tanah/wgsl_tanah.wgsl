

//tesss 
struct stmisc{
	view:mat4x4f,
	now:u32,
	//+3 pads
}
@group(0) @binding(0) var<uniform> misc:stmisc;

struct vout{
	@builtin(position) posout:vec4f,
	@location(0) pos:vec4f,
}

@vertex fn vvvv(
	@location(0) pos:vec3f,
)-> vout{
	let m0 = misc.view;
	
	//zoom out
	let s = .1;
	let m1 = mat4x4f(
		 s, 0.0, 0.0, 0.0,
		 0.0, s, 0.0, 0.0,
		 0.0, 0.0, s, 0.0,
		 0.0, 0.0, 0.0, 1.0,
	);
	
	let posglo = vec4f(pos,1.,)
	;
	return vout(
		m0*posglo,
		posglo,
	);
}



@fragment fn fff(
	out:vout,
)-> @location(0) vec4f{
	let x = out.pos.x;
	let z = out.pos.z;
	return select(
		select(
			vec4f(.9,.8,.4,.99,),
			vec4f(.8,.7,.3,.99,),
			sin(sin(x*z)) < pow(5.,sin(z*sin(x)),)*sin(9.*x),
			//tan(x*z) < sin(z),
		),
		select(
			vec4f(.85,.75,.4,.99,),
			vec4f(.75,.65,.3,.99,),
			//sin(x*z-z)+cos(z*z) < atan(x*z),
			sin(x)%cos(x) < sin(z),
			//x*x+z*z < tan(200.*z/x),
		),
		tan(x+pow(.7,z,)) < sin(z+pow(.9,x,)+.2*x),
	);
}
