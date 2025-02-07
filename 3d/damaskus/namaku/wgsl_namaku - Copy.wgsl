


struct stmisc{
	view:mat4x4f,
	now:u32,
	//+3 pads
}
@group(0) @binding(0) var<uniform> misc:stmisc;
@group(0) @binding(1) var<uniform> mobj:mat4x4f;

struct vout{
	@builtin(position) posout:vec4f,
	@location(0) posgloout:vec4f,
}

@vertex fn vvvv(
	@location(0) pos:vec3f,
)-> vout{
	let m0 = misc.view;
	let m1 = mobj;
	let posglo = m1*vec4f(pos,1.,);
	return vout(
		m0*posglo,
		posglo,
	);
}

@fragment fn fff(
	out:vout,
)-> @location(0) vec4f{
	return out.posgloout;
}


	
	