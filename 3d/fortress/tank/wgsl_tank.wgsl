

//tesss 
struct stmisc{
	view:mat4x4f,
	now:u32,
	//+3 pads
}
@group(0) @binding(0) var<uniform> misc:stmisc;
@group(0) @binding(1) var<uniform> sound0: vec4f;

@vertex fn vvvv(
	
	
	
	@location(0) meshpos:f32,
	@location(1) uv3d:vec3f,
	@location(2) pos:vec3f,
	@builtin(instance_index) iid: u32,
	
	
	
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
	
	
	
	let posglo = vec4f(pos,1.,);//aaaaaaaaa
	let postank0 = m0*m1*select( //select ga bisa pake matrix
		m2lain(iid)*posglo,
		m2()*posglo,
		bool(iid == 0),
	);
	return vout(
		postank0,
		uv3d,
		meshpos,
	);
}
struct vout{
	@builtin(position) posout:vec4f,
	@location(0) uv3d:vec3f,
	@location(1) meshpos:f32,
}


@fragment fn fff(
	o:vout,
)-> @location(0) vec4f{
	let x = o.uv3d.x;
	let y = o.uv3d.y;
	let z = o.uv3d.z;
	
	//return vec4f(x,y,z,.5,);
	return 
	j(
		j(
			track(x,y,z,),
		o.meshpos < 1.,
			badan(x,y,z,)
		),
	o.meshpos < 2.,
		j(
			moncong(x,y,z,),
		o.meshpos < 3.,
			j(
				gunung(x,y,z,),
			o.meshpos < 4.,
				moncong(x,y,z,)//roda
			)
		)
	);
}







fn mymod(x: f32, y: f32) -> f32 {
    let r = x % y;
    return select(r + y, r, r >= 0);
}

// Helper function: Conditional (jika)
fn j(t: vec4f, c: bool, f: vec4f) -> vec4f {
    if (c) {
        return t;
    } else {
        return f;
    }
}

// Track function
fn track(uvx: f32, uvy: f32, uvz: f32) -> vec4f {
    return j(
        vec4f(0.5, 0.5, 0.5,1.,),
        tan(uvx) < sin(uvy * 22.0),
        vec4f(0.2, 0.2, 0.2,1.,)
    );
}

// Badan function
fn badan(uvx: f32, uvy: f32, uvz: f32) -> vec4f {
    let cond: bool =
        (mymod(uvy, 2.0) < 1.0) && (
            (mymod(uvx, 3.0) < 2.5) !=
            (mymod(uvz, 11.0) < 2.0)
        );
    return j(
        vec4f(0.4, 0.4, 0.4,1.,),
        cond,
        vec4f(0.3, 0.3, 0.3,1.,)
    );
}

// Moncong function
fn moncong(uvx: f32, uvy: f32, uvz: f32) -> vec4f {
    return j(
        vec4f(0.35, 0.35, 0.35,1.,),
        sin(uvy) < 0.0,
        vec4f(0.2, 0.2, 0.2,1.,)
    );
}

// Gunung function
fn gunung(uvx: f32, uvy: f32, uvz: f32) -> vec4f {
    let cond: bool =
        (mymod(uvy, 2.0) < 1.0) && (
            (mymod(uvx, 3.0) < 2.5) !=
            (mymod(uvz, 11.0) < 2.0)
        );
    return j(
        vec4f(0.5, 0.5, 0.5,1.,),
        cond,
        vec4f(0.4, 0.4, 0.4,1.,)
    );
}

fn m2(
)->mat4x4f{
	
	let duar = 12.8;
	let ani = sound0[0]*.001;
	var z = ani;
	z = z-duar;
	z = z*9.;
	z = select(
		.0,
		z,
		z < .0,
	);
	
	var y = ani;
	y = clamp(y-duar,.0,.99,);
	y = sin(y*3.)*11.;
	
	var rot = ani;
	rot = clamp(rot-duar,.0,1.05,);
	rot = rot*3.7;
	
	return mat4x4f(
		 cos(rot), -sin(rot), 0.0, 0.0,
		 sin(rot), cos(rot), 0.0, 0.0,
		 0.0, 0.0, 1.0, 0.0,
		 0.0, y, z, 1.0,
	);
}

fn m2lain(
	iid:u32,
)->mat4x4f{
	let ani = sound0[0]*.001;
	let fiid = f32(iid);
	let x = (fiid%7)*1.2;
	let z = fiid*-22.-222.+ani*3.;
	return mat4x4f(
		 1.0, 0.0, 0.0, 0.0,
		 0.0, 1.0, 0.0, 0.0,
		 0.0, 0.0, 1.0, 0.0,
		 x, 0.0, z, 1.0,
	);
	
}