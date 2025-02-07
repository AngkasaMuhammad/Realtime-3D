

//tesss 
struct stmisc{
	view:mat4x4f,
	now:u32,
	//+3 pads
}
@group(0) @binding(0) var<uniform> misc:stmisc;
@group(0) @binding(1) var<uniform> sound0: vec4f;

@vertex fn vvvv(
	@location(0) pos:vec3f,
)-> vout{
	let duar = 12.8;
	var s0 = sound0[0]*.001;
	s0 -= duar;//skala saat meledak
	if(
		(s0 < .0)
		|| (1. < s0)
	){
		return vout(vec4f(.0));
	}
	
	let m0 = misc.view;
	//zoom out
	let s = .1 *s0*222.;
	let m1 = mat4x4f(
		 s, 0.0, 0.0, 0.0,
		 0.0, s, 0.0, 0.0,
		 0.0, 0.0, s, 0.0,
		 0.0, 0.0, 0.0, 1.0,
	);
	
	let posglo = vec4f(pos,1.,);
	return vout(
		m0*m1*posglo,
		//posglo,
	);
}


struct vout{
	@builtin(position) posout:vec4f,
	//@location(0) pos:vec4f,
}


@fragment fn fff(
	//out:vout,
)-> @location(0) vec4f{
	let duar = 12.8;
	let a = 1.-sound0[0]*.001+duar;
	return vec4f(1.,1.,1.,a,);
}
