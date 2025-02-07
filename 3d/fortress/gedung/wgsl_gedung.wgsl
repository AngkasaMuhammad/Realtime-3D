

//tesss 
struct stmisc{
	view:mat4x4f,
	now:u32,
	//+3 pads
}
@group(0) @binding(0) var<uniform> misc:stmisc;
@group(0) @binding(1) var<uniform> contr: vec4f; //baruuuuu

struct vout{
	@builtin(position) posout:vec4f,
	@location(0) nor:vec4f,
	@location(1) pos:vec4f,
	@location(2) fiid:f32,
}

@vertex fn vvvv(
	@location(0) nor:vec4f,
	@location(1) pos:vec3f,
	
	@builtin(instance_index) iid: u32,
)-> vout{
	let m0 = misc.view;
	let gakepake = contr[0];
	
	//zoom out
	let s = .1;
	let m1 = mat4x4f(
		 s, 0.0, 0.0, 0.0,
		 0.0, s, 0.0, 0.0,
		 0.0, 0.0, s, 0.0,
		 0.0, 0.0, 0.0, 1.0,
	);
	//global posiiton
	//let posglo = vec4f(pos,2.,);
	let fiid = f32(iid);
	let width = 53.;
	
	var ix = mymod(fiid,width,);
	ix = floor(ix*1.15);
	var iz = floor(fiid/width);
	iz = floor(iz*1.05);
	
	let posglo = vec4f(
		pos.x+ix*15.,
		pos.y*(
			floor(sin(tan(fiid))*5.)/5.
			+2.
		),
		pos.z+iz*15.,
		1.,
	)
	+vec4f(
		-444.,
		0,
		-999.,
		0,
	)
	;
	return vout(
		m0*m1*posglo,
		nor,
		posglo,
		fiid,
	);
}



@fragment fn fff(
	out:vout,
)-> @location(0) vec4f{
	var wt = sin(tan(out.fiid*.7))*.25+.7;
	
	let tembok = vec4f(vec3f(wt),1.,);
	let jendela = vec4f(.2,.2,.2,1.,);
	let p = out.pos-vec4f(vec3f(.5),1.,);
	//condition, jendela atau tembok
	let cond = (
	
		(mymod(p.y,2.,) < 1.) && (
			(mymod(p.x,3.,) < 1.) !=
			(mymod(p.z,4.,) < 2.)
		)
	
	);
	return select(tembok,jendela,cond,);
	//return vec4f(.9,.9,.9,.9);
}

fn a(z:f32)->f32{
	return atan(z/133.-8.)*133.+111.;
}
fn mymod(x: f32, y: f32) -> f32 {
    let r = x % y;
    return select(r + y, r, r >= 0);
}