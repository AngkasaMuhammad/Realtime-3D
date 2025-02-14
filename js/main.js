'use strict'

import {
	vec3 as v3,
	mat4 as m4,
} from 'https://wgpu-matrix.org/dist/3.x/wgpu-matrix.module.js'



import {
	lihat as lih,
	sleep,
	tyarr_b64,
	b64_tyarr,
	pisahstr,
	//getWordByIndex,
} from './utilku.js'



import {
	render,
	bikinrenderPassDescriptor,
	bikindeptex,
	bikinDRAWbuf,
	bikinbind,
	bikinINDbuf,
	bikinVERTbuf,
	bikinrenpip,
	bikinUNISTObuf,
	bikinattrinfo,
	bikinmodule,
	bikinentry,
	write,
	pantau_gpudevice,
	dv,
} from './pl.js'



import {
	canv3d,
	canv2d,
	cx3d,
	cx2d,
	tambahinfo,
	
	uibikincl,
	uidelcl,
	
	uiinsbuf,
	uiupdbuf,
	uidelbuf,
	
	uiloop,
} from './ui.js'



import {
	loadcam,
	fview,
} from './camera.js'

export let clmap = new Map()
let aucx = new AudioContext()

/*========
//siap reload, karena ada row yg berubah
let siap_controller = false
let siap_pipe = false
let siap_bind = false
let siap_pass = false
--------*/

//mau lihat
window.clmap = clmap
window.aucx = aucx

//cldict & subdict ga aku gabungin, script terlanjur ruwettt
export let cldict = {}
export let subdict = {} //jumlahnya = cldict

export let bufdict = {}

let w = canv3d.width
let h = canv3d.height

let deptex =
bikindeptex(w,h,)

let rpd =
bikinrenderPassDescriptor(
	[0.0, 0.1, 0.2, 1,],
	deptex,
)

loadcam()

let presentationFormat = navigator.gpu.getPreferredCanvasFormat()
pantau_gpudevice.push(e=>{
	tambahinfo(e.error.message,'#ff00ffff','gpudeviceinfo',)
})

let clid = 0
let _clinfo = class{
	constructor(param_supa){
		this.supa = param_supa
		this.id = clid++
		
		//siap reload, karena ada row yg berubah
		this.siap_controller = false
		this.siap_pipe = false
		this.siap_bind = false
		this.siap_pass = false
		
		this.sub = 
		this
		.supa
		.channel('pantau buffer')
		.on(
		'postgres_changes',
		{
			event:'*',
			schema:'public',
			table:'buffer_list'
		},
		pa=>pantaubuf[pa.eventType](
			this.id,
			pa.new,
			pa.old,
		),
		)
		
		this.sub.subscribe()
	}
	
	tambahrow = async rowpa=>{
		let rowinfo = await _rowinfo(this,rowpa,)
		clmap.get(this)
		.set(rowpa.id,rowinfo,)
		uiinsbuf(rowinfo)
	}
	
	//siap reload, karena ada row yg berubah
	setsiap_controller	= siap_controller	=>this.siap_controller	= siap_controller	
	setsiap_pipe	= siap_pipe	=>this.siap_pipe	= siap_pipe	
	setsiap_bind	= siap_bind	=>this.siap_bind	= siap_bind	
	setsiap_pass	= siap_pass	=>this.siap_pass	= siap_pass	
	
	hapus = ()=>{
		for(let [id,rowinfo,] of clmap.get(this)){
			rowinfo.hapus()
			urutkanpass = true
			uidelbuf(rowinfo)
		}
		this.sub.unsubscribe()
		uidelcl(this)
		clmap.delete(this)
	}
}

let _rowinfo = (class{
	static bikin = async (...param)=>{
		let o = new this()
		await o.bikinprop(...param)
		return o
	}
	bikinprop = async (clinfo,rowpa,)=>{
		this.data =		//ragam
		this.aucon = null		//ragam
		this.clinfo = clinfo		//ajeg
		this.fsfh = null
		this.isrealtime = false
		this.lastmod = 0
		this.uikey = ''//siap upload dari ui
		
		await this.readrowpa(rowpa)
	}
	
	readrowpa = async rowpa=>{
		this.buffer	= rowpa.buffer
		this.created_at	= rowpa.created_at
		this.descr	= rowpa.descr
		this.id	= rowpa.id
		this.usage	= rowpa.usage
		
		await this.bikindata(rowpa)
	}
	bikindata = async rowpa=>{
		await usfubuf[rowpa.usage][1](this,rowpa,).catch(e=>tambahinfo(
`Error: adaerror
	
${e.stack ?? e.message}
	
	di client id ${this.clinfo.id}
	di id ${this.id}
`		,'orange',))
	}
	setdata = async (data,audata,)=>{
		this.aucon?.destroy()
		this.data?.destroy?.()
		this.aucon = null
		this.data = data
		
		//reload next reader
		let cl = this.clinfo
		switch(this.usage){
			case 'bufvert'	:
			case 'bufind'	:
			case 'bufdraw'	:
			case 'bind'	:
				cl.setsiap_pass(true) ;break
			case 'sound'	:
				cl.setsiap_controller(true) ;break
			case 'wgsl'	:
				cl.setsiap_pipe(true) ;break
			case 'bufsto'	:
			case 'bufuni'	:
			case 'pipe'	:
			case 'controller'	:
				cl.setsiap_bind(true) ;break
			//pass dah pol
		}
		
		if(this.usage !== 'controller'){ return }
		this.aucon = new aucon(audata)
	}
	setfsfh = fsfh=>this.fsfh = fsfh
	setrealtime = check=>this.isrealtime = check
	setlastmod = lastmod=>this.lastmod = lastmod
	setuikey = uikey=>this.uikey = uikey
	
	//time
	settime = async (time0,time1,timejarak,isplaying,)=>{
		if(this.usage !== 'controller'){ return lih('Error: usage harus berupa controller')}
		write(this.data,new Float32Array([
			time0,
			time1,
			timejarak,
			isplaying,
		]),)
	}
	
	hapus = async ()=>{
		this.aucon?.destroy()
		this.data?.destroy?.()
		clmap.get(this.clinfo).delete(this.id)
	}
}).bikin
let aucon = class {
	constructor(audioData) {
		let curtime = aucx.currentTime
		this.audioContext = aucx;
		this.audioData = audioData;
		this.sources = [];
		this.gainNodes = [];
		this.isPlaying = false;
		this.speed = 1;
		this.startTime = curtime;// global
		this.curtime = 0;// global, ga realtime
		this.lastseek = 0;// local
		this.stopTime = curtime;// global
	}

	createSource(audioBuffer, volume, loop,newspeed,) {
		const source = this.audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.playbackRate.value = newspeed;
		source.loop = loop;

		const gainNode = this.audioContext.createGain();
		gainNode.gain.value = volume;

		source.connect(gainNode).connect(this.audioContext.destination);

		return { source, gainNode };
	}

	start_at(seek,newspeed,) {
		if (this.isPlaying) return;
		this.isPlaying = true;
		
		let curtime = this.audioContext.currentTime
		
		let newstartTime = curtime
		
		this.audioData.forEach(({ src, when, offset, duration, volume, loop, }) => {
			const { source, gainNode } = this.createSource(src, volume, loop,newspeed,);
			
			let whenglo	= newstartTime + (when - seek)/newspeed	;	;whenglo = Math.max(0,whenglo,)
			let offsetlok	= Math.max(offset,offset + seek - when,)	;	;offsetlok = Math.max(0,offsetlok,)
			
			if(duration === null){
//cobaan, 
if(loop){
	offsetlok %= src.duration
}
//
				source.start(whenglo,offsetlok,)
			}else{
				let durglo = Math.min(duration,duration + when - seek,) ;durglo = Math.max(0,durglo,)
				source.start(whenglo,offsetlok,durglo,)
			}
			this.sources.push(source);
			this.gainNodes.push(gainNode);
			
		});
		//akhir
		this.speed = newspeed
		this.startTime = curtime
		this.lastseek = seek

	}
	
	getCurTime() {//realtime
		let curtime = this.audioContext.currentTime
		return this.isPlaying
		? (
			(this.isPlaying ? curtime : this.stopTime)
			- this.startTime
		)*this.speed + this.lastseek
		: this.curtime
	}

	destroy() {
		if (!this.isPlaying) return
		this.curtime = this.getCurTime()
		this.isPlaying = false;
		this.stopTime = this.audioContext.currentTime
		this.sources.forEach((source) => {
			source.stop();
			source.disconnect();
		});
		this.gainNodes.forEach((gainNode) => gainNode.disconnect());
		this.sources = [];
		this.gainNodes = [];
	}
	
	//lainlain
	play(){
		//"this.curtime" beda dengan "curtime"
		this.start_at(this.curtime,this.speed,)
	}
	pause(){
		this.destroy()
	}
	setCurTime(time){
		if(this.isPlaying){
			this.destroy()
			this.start_at(time,this.speed,)
		}else{
			this.curtime = time
		}
	}
	setspeed(speed){
		if(this.isPlaying){
			this.destroy()
			this.start_at(this.curtime,speed,)
		}else{
			this.speed = speed
		}
	}
};

addEventListener('mousedown',e=>aucx.resume(),)

export let main = async()=>{ try{
	lih('teess, ini main js')
	
	requestAnimationFrame(loop)
/*========
	let cl = window.cl = await bikinclinfo(
		'https://hmbtdoeieiezztgpexpw.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYnRkb2VpZWllenp0Z3BleHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2Nzg0NjUsImV4cCI6MjA0NzI1NDQ2NX0.q1lwtj-oqhSXBPdvYRNpOxGQ4HJ-VX6g_jJws4eX_0A',
	)

	let cl = window.cl = await bikinclinfo(
		'https://gwpezptjslssarivlqro.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cGV6cHRqc2xzc2FyaXZscXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTc4NzYsImV4cCI6MjA0ODA3Mzg3Nn0.MddHNM2aeBTNdys19AW544maLh-7ipzsQz8Yzl7h6AA',
	)
--------*/

	
}catch(err){
	lih(err)
} }

let tunggu_rpd = null //renderpassdict promise object
let loop = async t=>{
	uiloop(t).catch(lih)
	await tunggu_rpd
	tunggu_rpd = renderpassdict()
	requestAnimationFrame(loop)
}

let misc = new ArrayBuffer((
	+16 //camera view
	+4 //time now & 3 pad
)*4)
let view = new Float32Array(misc,( 0 )*4,16,)
let now = new Uint32Array(misc,( 0+16 )*4,4,)
fview(camera_view=>{
	m4.copy(camera_view,view,)
})
let miscbuf = bikinUNISTObuf(
	misc,true,
)

export let bikinclinfo = async (supabaseUrl, supabaseKey,)=>{
	//bikin client
	let clini = new _clinfo(
		supabase.createClient(supabaseUrl, supabaseKey,)
	)
	lih(clini)
	
	//payload
	let clpa = await clini
		.supa
		.from('buffer_list')
		.select('*')

	lih(clpa)
	if(clpa.error){ throw JSON.stringify(clpa.error,null,'\t',) }
	clmap.set(clini,new Map(),)
	for(let rowpa of usagesort(clpa.data)){
		await clini.tambahrow(rowpa)
	}
	
	uibikincl(clini)
}
//mau lihat
window.bikinclinfo = bikinclinfo

export let hapusclinfo = clid=>{
	urutkanpass = true
	let f = f_cl_cari
	clid = String(clid)
	
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	subdict[clid].buf.unsubscribe()
	delete subdict[clid]
	
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	f(bufdict,clid,k=>{
		bufdict[k].data?.destroy?.()
		for(let [kini,target,] of targetmap){
			target.delete(k) //hapus targetmap k dari target
		}
		targetmap.delete(k)
		delete bufdict[k]
		uidelbuf(k)
	})
	
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	delete cldict[clid]
	
	uicl(cldict)
	lih(`cl ${clid} deletedddd`)
}



let f_cl_cari = (dict,str,f,)=>{
	for (let key of Object.keys(dict)) {
		if (key.startsWith(str+' ')) {
			f(key)
		}
	}
}

const precedenceOrder = [
	"bufvert",
	"bufind",
	"bufdraw",
	"bufsto",
	"bufuni",
	"sound",
	"controller",
	"wgsl",
	"pipe",
	"bind",
	"pass",
]
let usagesort = items=>{
    // Create a precedence map: Constructor → Index
    const precedenceMap = new Map(precedenceOrder.map((type, index) => [type, index]));

    // Sort items based on the precedence of the `stuff` constructor
    return items.sort((a, b) => {
        const aPrecedence = precedenceMap.get(a.usage) ?? Infinity;
        const bPrecedence = precedenceMap.get(b.usage) ?? Infinity;
        return aPrecedence - bPrecedence;
    });
}

export let bikinbuf = async (
	clid,
	key,
	data,
	usage,
	descr,
)=>{
	let cl = null
	for(let [k,v,] of clmap){
		if(k.id === clid){
			cl = k
			break
		}
	}
	
	if(!cl){return tambahinfo(
		`client id: ${clid} tidak ditemukan.`,
		'orange',
	)}
	
	let data1 = await usfubuf[usage][0](data)//.catch(lih)
	lih(data1)
	return await cl.supa.rpc('insbuf',{
		buffer_param:data1,
		usage_param:usage,
		key_param:key,
		descr_param:descr,
	},)
}

export let updbuf = async (
	rowinfo,
	key,
	data,
	usage,
	descr,
)=>{
	//jika data === null, kolom buffer supabase ga berubah
	let data1 = 
	(data === null) ? null :
	await usfubuf[usage][0](data)
	
	return await rowinfo.clinfo.supa.rpc('updbuf',{
		id_param:rowinfo.id,
		key_param:key,
		buffer_param:data1,
		usage_param:usage,
		descr_param:descr,
	},)
}

export let hapusbuf = async (
	rowinfo,
	key,
)=>{
	return await rowinfo.clinfo.supa.rpc('delbuf',{
		id_param:rowinfo.id,
		key_param:key,
	})
}

let usfubuf = { //usage_function buffer
	//[upload,download,fungsibuf,]
	
	//tyarr <<-- -->> b64
	bufvert	:[null,null,arr=>bikinVERTbuf(arr),],
	bufind	:[null,null,arr=>bikinINDbuf(arr),],
	bufdraw	:[null,null,arr=>bikinDRAWbuf(arr),],
	bufsto	:[null,null,arr=>bikinUNISTObuf(arr,false,),],
	bufuni	:[null,null,arr=>bikinUNISTObuf(arr,true,),],
	sound	:[null,null,],
	controller	:[null,null,],
	
	//string
	wgsl	:[null,null,],
	
	//json
	pipe	:[null,null,],
	bind	:[null,null,],
	pass	:[null,null,],
}
let pantaubuf = {}

usfubuf.bufvert[0] =
usfubuf.bufind[0] =
usfubuf.bufdraw[0] =
usfubuf.bufsto[0] =
usfubuf.bufuni[0] =
async file=>{
	let arr = await file.arrayBuffer()
	return await tyarr_b64(arr)
}

usfubuf.wgsl[0] =
async file=>await file.text()

usfubuf.sound[0] =
usfubuf.controller[0] =
usfubuf.bind[0] =
usfubuf.pipe[0] =
usfubuf.pass[0] =
async file=>JSON.parse(await file.text())

usfubuf.bufvert[1] =
usfubuf.bufind[1] =
usfubuf.bufdraw[1] =
usfubuf.bufsto[1] =
usfubuf.bufuni[1] =

async (rowinfo,rowpabaru,)=>{
	let arr = await b64_tyarr(rowpabaru.buffer) //mungkin error: atob
	
	//data: kalo cuma ubah value, pake write
	if(
		rowinfo.data
		&& (rowinfo.usage === rowpabaru.usage)
		&& (rowinfo.data.size === arr.byteLength)
	){
		write(rowinfo.data,arr,)
	}else{
		rowinfo.setdata(usfubuf[rowpabaru.usage][2](arr))
	}
}

usfubuf
.sound[1] =
async (rowinfo,rowpabaru,)=>{
	let desc = structuredClone(rowpabaru.buffer)
	let rowmap = clmap.get(rowinfo.clinfo)
	
	const response = await fetch(desc);
	const arrayBuffer = await response.arrayBuffer();
	let aubuf = await aucx.decodeAudioData(arrayBuffer);
	rowinfo.setdata(aubuf)
}

usfubuf
.controller[1] =
async (rowinfo,rowpabaru,)=>{
	let desc = structuredClone(rowpabaru.buffer)
	let rowmap = clmap.get(rowinfo.clinfo)
	
	let arr = new Float32Array(4)
	// time0, time1, timejarak, isplaying
	if(
/*=======
		rowinfo.data
		&& (rowinfo.usage === rowpabaru.usage)
		&& (rowinfo.data.size === arr.byteLength)
--------*/
		false //tetap setdata
	){
		write(rowinfo.data,arr,)
	}else{
		for(let i = 0;i < desc.length;i++){
			desc[i].src = rowmap.get(desc[i].src).data
		}
		rowinfo.setdata(
			bikinUNISTObuf(arr,true,),
			desc,
		)
	}
	rowinfo.aucon.start_at(0,1,)
}

usfubuf
.wgsl[1] =
async (rowinfo,rowpabaru,)=>{
	let mod = await bikinmodule(rowpabaru.buffer)
	rowinfo.setdata(mod)
}

usfubuf
.pipe[1] =
async (rowinfo,rowpabaru,)=>{
	let desc = structuredClone(rowpabaru.buffer)
	let rowmap = clmap.get(rowinfo.clinfo)
	
	desc.vertex.module = rowmap
	.get(desc.vertex.module)
	.data
	
	desc.fragment.module = rowmap
	.get(desc.fragment.module)
	.data
	
	for(let target of desc.fragment.targets){
		target.format = presentationFormat
	}
	
	let out = dv.createRenderPipeline(desc)
	rowinfo.setdata(out)
	
}

usfubuf
.bind[1] =
async (rowinfo,rowpabaru,)=>{
	let desc = structuredClone(rowpabaru.buffer)
	let rowmap = clmap.get(rowinfo.clinfo)
	
	desc.layout = rowmap
	.get(desc.layout.pipe)
	.data
	?.getBindGroupLayout(desc.layout.layout)
	
	for(let bindbuf of desc.entries){
		
		
		if(bindbuf.resource.buffer === 'misc'){
			bindbuf.resource.buffer = miscbuf
			continue
		}
		bindbuf.resource.buffer = rowmap
		.get(bindbuf.resource.buffer)
		.data
		
		
	}
	
	let out = dv.createBindGroup(desc)
	rowinfo.setdata(out)
}

usfubuf
.pass[1] =
async (rowinfo,rowpabaru,)=>{
	let desc = structuredClone(rowpabaru.buffer)
	let rowmap = clmap.get(rowinfo.clinfo)
	
	for(let pass of desc.pass){
		pass.pipe = rowmap.get(pass.pipe)
		for(let i in pass.bind){
			pass.bind[i] = rowmap.get(pass.bind[i])
		}
		for(let i in pass.vert){
			pass.vert[i] = rowmap.get(pass.vert[i])
		}
		pass.ind = rowmap.get(pass.ind)
		pass.draw = rowmap.get(pass.draw)
	}
	
	rowinfo.setdata(desc)
	urutkanpass = true
}

pantaubuf.INSERT = async (clid,rowpa,)=>{
	let cl = null
	for(let [k,v,] of clmap){
		if(k.id === clid){
			cl = k
			break
		}
	}
	await cl.tambahrow(rowpa)
}

pantaubuf.UPDATE = async (clid,row,rowold,)=>{	
	let rowinfo = null
	for(let [k,v,] of clmap){
		if(k.id === clid){
			rowinfo = v.get(row.id)
			break
		}
	}
	await rowinfo.readrowpa(row).catch(e=>{
		updinfo(e,rowinfo,)
	})

	uiupdbuf(rowinfo)
}

let updinfo = async (a,rowinfo,)=>{
	tambahinfo(
`Error: adaerror

${a}

	di client id ${rowinfo.clinfo.id}
	di id ${rowinfo.id}
`			,
			'orange',
	)
}

pantaubuf.DELETE = async (clid,row,rowold,)=>{	
	let rowinfo = null
	for(let [k,v,] of clmap){
		if(k.id === clid){
			rowinfo = v.get(rowold.id)
			break
		}
	}
	await rowinfo.hapus()
	urutkanpass = true
	uidelbuf(rowinfo)
}

let urutkanpass = false
let caritargetkosong = false
let passurut = []
let renderpassdict = async ()=>{
	now[0] = Math.round(performance.now())
	write(miscbuf,misc,)
	
	//nanti cek update
	//
	if(urutkanpass){
		urutkanpass = false
		passurut = []
		for (const rowmap of clmap.values()) {
			for (const rowinfo of rowmap.values()) {
				;(rowinfo.usage === 'pass')
				? passurut.push(rowinfo) : 0
			}
		}
		passurut
		.sort((a,b,)=>a.data.order-b.data.order)
	}
	
	for(let [clinfo,rowmap,] of clmap){
		for(let [id,rowinfo,] of rowmap){
			if(rowinfo.fsfh && rowinfo.isrealtime){
				rowfile(rowinfo)
			}
		}
		
		
		
		//siap_controller
		for(let [id,rowinfo,] of rowmap){
			;clinfo.siap_controller
			&& (rowinfo.usage === 'controller')
			&& await rowinfo.bikindata(rowinfo)
		}
		clinfo.setsiap_controller(false)
		//siap_pipe
		for(let [id,rowinfo,] of rowmap){
			;clinfo.siap_pipe
			&& (rowinfo.usage === 'pipe')
			&& await rowinfo.bikindata(rowinfo)
		}
		clinfo.setsiap_pipe(false)
		//siap_bind
		for(let [id,rowinfo,] of rowmap){
			;clinfo.siap_bind
			&& (rowinfo.usage === 'bind')
			&& await rowinfo.bikindata(rowinfo)
		}
		clinfo.setsiap_bind(false)
		//siap_pass
		for(let [id,rowinfo,] of rowmap){
			;clinfo.siap_pass
			&& (rowinfo.usage === 'pass')
			&& await rowinfo.bikindata(rowinfo)
		}
		clinfo.setsiap_pass(false)
	}
	
/*========
	//siap
	siap_controller		&& await siap('controller'	)
	siap_pipe		&& await siap('pipe'	)
	siap_bind		&& await siap('bind'	)
	siap_pass		&& await siap('pass'	)
	
	siap_controller	=
	siap_pipe	=
	siap_bind	=
	siap_pass	= false
--------*/
	
	//render
	let err = await render(passurut,passgetdata,)
	err && tambahinfo(
`Error: render error

${err}
`	,'#ff9977ff','rendererror',)
}

export let rowfile = async rowinfo=>{
	let file = await rowinfo.fsfh.getFile()
	if(rowinfo.lastmod !== file.lastModified){
		rowinfo.setlastmod(file.lastModified)
		updbuf(
			rowinfo,
			rowinfo.uikey,
			file,
			rowinfo.usage,
			rowinfo.descr,
		)
	}
}






//-=-=-=-=-=-=-=
/*========
let siap = async usage=>{
	for(let [clinfo,rowmap,] of clmap){
	for(let [id,rowinfo,] of rowmap){
		;(rowinfo.usage === usage)
		&& await rowinfo.bikindata(rowinfo)
	}
	}
}
--------*/

let passgetdata = rowinfo=>rowinfo.data
window.cldict = cldict
window.subdict = subdict

window.bufdict = bufdict

//window.bikinclinfo = bikinclinfo
//window.hapusclinfo = hapusclinfo

window.bikinbuf = bikinbuf
window.updbuf = updbuf
window.hapusbuf = hapusbuf

window.passurut = passurut

/*
-=-===-=-=-==--=-=-=--==--==--=











-=-===-=-=-==--=-=-=--==--==--=
*/
