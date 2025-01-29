"use strict"
/*
RENCANA:
=>	updbuf
--	reload row manual
	
*/
import {
	bikinclinfo,
	hapusclinfo,
	
	clmap,
	updbuf,
	//buffile, //akan update lastmodified
	bikinbuf,
	hapusbuf,
	
} from './main.js'

import {
	lihat as lih,
	que,
	attr,
} from './utilku.js'




let tatab = e=>{//tulis tab
	let ta = e.currentTarget
	if (e.key === "Tab") {
		e.preventDefault();
		document.execCommand("insertText", false, '\t');
	}
	tares(e)
}
let tares = e=>{//textarea resize
	let ta = e.currentTarget
	ta.style.width =
	ta.style.height = '0px'
	ta.style.width = ta.scrollWidth+'px'
	ta.style.height = ta.scrollHeight+'px'
}
let bufdescr = que('#bufdescr')[0]
bufdescr.addEventListener('keydown',tatab,)
bufdescr.addEventListener('input',tares,)

let fSH = e=>{
	let cur = e.currentTarget
	let n = cur.classList.toggle('nyala')
	let c = que(attr(cur,'sasaran',))[0].classList
	let s = 'hidechild'
	c.contains(s)?c.remove(s):c.add(s)
}
que('#SHhelp')[0].addEventListener('click',fSH,)
que('#SHdata')[0].addEventListener('click',fSH,)
que('#SHinfo')[0].addEventListener('click',fSH,)

let supaurl = que('#supaurl')[0]
let supakey = que('#supakey')[0]
/*=-=-=-=-=-=-=-=-










=-=-=-=-=-=-=-=-*/
//cl
que('#newcl')[0].addEventListener('click',e=>{
	let url = supaurl.value
	let key = supakey.value
	bikinclinfo(url,key,).catch(e=>tambahinfo(e,'red',))
	supaurl.value =
	supakey.value = ''
},)
export let uibikincl = clinfo=>{
	let tbody = que('#cl')[0]
	let tr,td
	tr = document.createElement('tr')
		attr(tr,'clinfoid',clinfo.id,)
		td = document.createElement('td')
			td.appendChild(svg('#del',hapuscl,))
		tr.appendChild(td)
		td = document.createElement('td')
			td.textContent = clinfo.id
		tr.appendChild(td)
		td = document.createElement('td')
			td.textContent = clinfo.supa.supabaseUrl
		tr.appendChild(td)
		td = document.createElement('td')
			td.textContent = clinfo.supa.supabaseKey
		tr.appendChild(td)
	tbody.appendChild(tr)
}
let hapuscl = e=>{//sampe sini, hapus clinfo
	if(e.detail%2){return}
	let cur = e.currentTarget
	cur.onmouseleave(e)
	let tr = cur
	.parentElement
	.parentElement
	let trch = tr.children
	
	let clinfo = null
	for(let [k,v,] of clmap){
		if(k.id === +attr(tr,'clinfoid',)){
			clinfo = k
			break
		}
	}
	clinfo.hapus()
	
	supaurl.value = trch[2].textContent
	supakey.value = trch[3].textContent
	
	tr.querySelector('svg').removeEventListener('click',hapuscl,)
	tr.remove()
}
export let uidelcl = clinfo=>{
	
}
/*=-=-=-=-=-=-=-=-










=-=-=-=-=-=-=-=-*/
//buf
let fileawal = new File(['"kosong"'],'ini_file_awal',)
que('#newbuf')[0].addEventListener('click',e=>{
	
	bikinbuf(
		+que('#bufclid')[0].value,
		que('#bufkey')[0].value,
		fileawal,
		que('#bufusage')[0].value,
		que('#bufdescr')[0].value,
	)
},)
export let uiinsbuf = rowinfo=>{
	
	let tbody = que('#buf')[0]
	let tr,td,select,inp,button,textarea,span
	tr = document.createElement('tr')
		attr(tr,'rowinfoid',rowinfo.id,)
		attr(tr,'clinfoid',rowinfo.clinfo.id,)
		
		td = document.createElement('td')
			td.appendChild(svg('#del',f_hapusbuf,))
			td.classList.add('rowhapus')
		tr.appendChild(td)
		td = document.createElement('td')
			td.textContent = rowinfo.clinfo.id
			td.classList.add('rowclid')
		tr.appendChild(td)
		td = document.createElement('td')
			td.textContent = rowinfo.id
			td.classList.add('rowid')
		tr.appendChild(td)
		td = document.createElement('td')
			td.classList.add('rowkey')
			inp = document.createElement('input')
				inp.type = 'password'
				inp.classList.add('key')
				inp.addEventListener('change',tuliskey,)
			td.appendChild(inp)
		tr.appendChild(td)
		td = document.createElement('td')
			td.classList.add('rowdata')
			inp = document.createElement('input')
				inp.type = 'checkbox'
				inp.addEventListener('input',realtimecheck,)
				inp.checked = false
				attr(inp,'mousedescr','Realtime',)
			td.appendChild(inp)
			button = document.createElement('button')
				button.textContent = '{kosong}'
				button.addEventListener('click',bukafilebuf,)
				attr(button,'mousedescr','Upload data',)
			td.appendChild(button)
		tr.appendChild(td)
		td = document.createElement('td')
			td.classList.add('rowusage')
			select = document.createElement('select')
				select.innerHTML = `

<option value="bufvert"	>bufvert	</option>
<option value="bufind"	>bufind	</option>
<option value="bufdraw"	>bufdraw	</option>
<option value="bufsto"	>bufsto	</option>
<option value="bufuni"	>bufuni	</option>
<option value="wgsl"	>wgsl	</option>
<option value="pipe"	>pipe	</option>
<option value="bind"	>bind	</option>
<option value="pass"	>pass	</option>
<option value="sound"	>sound	</option>
<option value="controller"	>controller	</option>

				`
				select.addEventListener('change',tulisusage,)
				select.value = rowinfo.usage
				attr(select,'curvalue',rowinfo.usage,)//current value
			td.appendChild(select)
		tr.appendChild(td)
		td = document.createElement('td')
			td.classList.add('rowcontroller')
			if(rowinfo.usage === 'controller'){
				bikincontroller(td)
			//+-+-+-+-+-+-+-+-
			
			//=-=-=-=-=-=-=-=-
			}
		tr.appendChild(td)
		td = document.createElement('td')
			td.classList.add('rowdescr')
			textarea = document.createElement('textarea')
				textarea.value = rowinfo.descr
				attr(textarea,'curvalue',rowinfo.descr,)
				textarea.addEventListener('keydown',tatab,)
				textarea.addEventListener('input',tares,)
				textarea.addEventListener('change',tulisdescr,)
				setTimeout(tares,1111,{currentTarget:textarea},)
			td.appendChild(textarea)
		tr.appendChild(td)
	tbody.appendChild(tr)
}
let bikincontroller = td=>{
	let svgplay = svg('#play',play,)
		svgplay.classList.add('play')
	td.appendChild(svgplay)
	let svgpause = svg('#pause',pause,)
		svgpause.classList.add('pause')
	td.appendChild(svgpause)
	let svgseek = svg('#seek',null,)
		svgseek.addEventListener('mousedown',seekdown,)
		svgseek.addEventListener('mousemove',seekmove,)
		svgseek.addEventListener('mouseup',seekup,)
		svgseek.classList.add('seek')
	td.appendChild(svgseek)
	let span = document.createElement('span')
		span.textContent = '00000'
		span.classList.add('curtime')
		attr(span,'mousedescr','Current time',)
	td.appendChild(span)
	let inp = document.createElement('input')
		inp.type = 'number'
		inp.value = 1
		inp.classList.add('speed')
		inp.addEventListener('change',speed,)
		attr(inp,'mousedescr','Speed',)
	td.appendChild(inp)
}
let hapuscontroller = td=>{
	let svgplay = td.querySelector('.play')
		svgplay.removeEventListener('click',play,)
	svgplay.remove()
	let svgpause = td.querySelector('.pause')
		svgpause.removeEventListener('click',pause,)
	svgpause.remove()
	let svgseek = td.querySelector('.seek')
		svgseek.removeEventListener('mousedown',seekdown,)
		svgseek.removeEventListener('mousemove',seekmove,)
		svgseek.removeEventListener('mouseup',seekup,)
	svgseek.remove()
	let span = td.querySelector('.curtime')
	span.remove()
	let inp = td.querySelector('.speed')
		inp.removeEventListener('change',speed,)
	inp.remove()
}
let f_hapusbuf = async e=>{//blum diurus
	if(e.detail%2){return}
			let ele = e.currentTarget
			let tr = ele
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	if(!(await hapusbuf(
		rowinfo,
		tr.querySelector('.rowkey *').value,
	)).data){
		aksesditolak(rowinfo)
	}
	
}
let tuliskey = async e=>{
			let inp = e.currentTarget
			let tr = inp
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	if(!(await updbuf(
		rowinfo,
		rowinfo.setuikey(inp.value),//key
		null,//await rowinfo.fsfh?.getFile() ?? fileawal,,
		tr.querySelector('.rowusage *').value,
		tr.querySelector('.rowdescr *').value,
	)).data){
		aksesditolak(rowinfo)
	}
}
let bukafilebuf = async e=>{
			let button = e.currentTarget
			let tr = button
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	let [fsfh] = await showOpenFilePicker()
	rowinfo.setfsfh(fsfh)
	
	button.textContent = fsfh.name
}
let realtimecheck = e=>{
			let inp = e.currentTarget
			let tr = inp
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	rowinfo.setrealtime(!rowinfo.isrealtime)
	inp.checked = rowinfo.isrealtime
}
let tulisusage = async e=>{
			let inp = e.currentTarget
			let tr = inp
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	if(!(await updbuf(
		rowinfo,
		tr.querySelector('.rowkey *').value,
		null,//await rowinfo.fsfh?.getFile() ?? fileawal,,
		inp.value,//usage
		tr.querySelector('.rowdescr *').value,
	)).data){
		inp.value = attr(inp,'curvalue',)
		aksesditolak(rowinfo)
	}
}
let ctrgetaucon = e=>getrowinfo(e.currentTarget.parentElement.parentElement)
let getrowinfo = tr=>{ //e dari play pause seek speed
	let clid = +tr.querySelector('.rowclid').textContent
	let rowid = +attr(tr,'rowinfoid',)
	//lih({clid,rowid,})
	
	for(let [k,v,] of clmap){
		if(k.id === clid){
			return v.get(rowid)
			break
		}
	}
	return null
}
let play = e=>{
	let aucon = ctrgetaucon(e).aucon
	aucon.play()
}
let pause = e=>ctrgetaucon(e).aucon.pause()
let seekdown = e=>e.currentTarget.requestPointerLock()
let seekmove = e=>{
	if(document.pointerLockElement !== e.currentTarget){ return }
	let aucon = ctrgetaucon(e).aucon
	aucon.setCurTime(Math.max(0,aucon.getCurTime()+ +e.movementX/44),)
}
let seekup = e=>document.exitPointerLock()
let speed = e=>{
	let aucon = ctrgetaucon(e).aucon
	aucon.setspeed(+e.currentTarget.value)
}
let tulisdescr = async e=>{
			let inp = e.currentTarget
			let tr = inp
			.parentElement
			.parentElement
			let rowinfoid = +attr(tr,'rowinfoid',)
			let rowinfo = null
			for(let [k,v,] of clmap){
				if(k.id === +attr(tr,'clinfoid',)){
					rowinfo = v.get(rowinfoid)
					break
				}
			}
	
	if(!(await updbuf(
		rowinfo,
		tr.querySelector('.rowkey *').value,
		null,//null,//await rowinfo.fsfh?.getFile() ?? fileawal,,
		tr.querySelector('.rowusage *').value,
		inp.value,//descr
	)).data){
		inp.value = attr(inp,'curvalue',)
		tares({currentTarget:inp,})
		aksesditolak(rowinfo)
	}
}

export let uiupdbuf = rowinfo=>{
	let clid = rowinfo.clinfo.id
	let id = rowinfo.id
	let tr = que(`[clinfoid="${clid}"][rowinfoid="${id}"]`)[0]
	let select = tr.querySelector(`select`)
	select.value = rowinfo.usage
	attr(select,'curvalue',rowinfo.usage,)
	
	let ta = tr.querySelector(`textarea`)
	ta.value = rowinfo.descr
	attr(ta,'curvalue',rowinfo.descr,)
	
	let controller = tr.querySelector(`.rowcontroller`)
	if(!controller.childElementCount && (rowinfo.usage === 'controller')){ bikincontroller(controller) }
	if(controller.childElementCount && (rowinfo.usage !== 'controller')){ hapuscontroller(controller) }
	
	tares({currentTarget:ta,})
}
export let uidelbuf = rowinfo=>{
	let clid = rowinfo.clinfo.id
	let id = rowinfo.id
	let tr = que(`[clinfoid="${clid}"][rowinfoid="${id}"]`)[0]
	let controller = tr.querySelector(`.rowcontroller`)
	;(rowinfo.usage === 'controller') && hapuscontroller(controller)
	//remove listener
		tr.querySelector('.rowhapus svg'	).removeEventListener('click'	,f_hapusbuf	,)
		tr.querySelector('.rowkey .key'	).removeEventListener('change'	,tuliskey	,)
		tr.querySelector('.rowdata input'	).removeEventListener('input'	,realtimecheck	,)
		tr.querySelector('.rowdata button'	).removeEventListener('click'	,bukafilebuf	,)
		tr.querySelector('.rowusage select'	).removeEventListener('change'	,tulisusage	,)
		tr.querySelector('.rowdescr textarea'	).removeEventListener('keydown'	,tatab	,)
		tr.querySelector('.rowdescr textarea'	).removeEventListener('input'	,tares	,)
		tr.querySelector('.rowdescr textarea'	).removeEventListener('change'	,tulisdescr	,)
	//
	tr.remove()
}

export let uiloop = async t=>{
	let chi = que('#buf')[0].children
	for(let i = 0;i < chi.length;i++){
		let tr = chi[i]
		let rowinfo = getrowinfo(tr)
		let aucon = rowinfo.aucon
		if(
			(rowinfo.usage !== 'controller')
			|| !aucon
		){ continue }
		let curtime =
		tr.querySelector('.curtime').textContent =
		aucon.getCurTime().toFixed(3)
		rowinfo.settime(curtime*1111,0,0,0,)
		
	}
}


export let aksesditolak = rowinfo=>tambahinfo(
`Error: Akses ditolak, key salah.
	di clid ${rowinfo.clinfo.id}
	di id ${rowinfo.id}
`
,'#aaaaaaff',)
//setInterval(upduibuf,333,)
/*=-=-=-=-=-=-=-=-










=-=-=-=-=-=-=-=-*/
//lain - lain
let svg = (queini,f,)=>{//copy gambar tongsampah
	let del = que(queini)[0].cloneNode(true)
	del.classList.remove('hilang')
	del.id = ''
	;(f !== null) && del.addEventListener('click',f,)
	return del
}
let infolist = que('#infolist')[0]
let clearinfo = que('#clearinfo')[0]
let infolistcla = infolist.classList
export let tambahinfo = (i,warna,infokey,)=>{
	i =
	i?.stack ??
	i
	
	let cek = Math.random()
	let adaele
	if((infokey ?? cek) !== cek){//apakah infoke berupa null atau undefined
		adaele	= que(`#infolist [infokey="${infokey}"`)[0]
	}
	if(adaele){
		//infolistcla.add('infoupdate')
		adaele.style.background = `rgba(66,66,66,${Math.random()})`
		let t = Date.now()
		if(4 < t-attr(adaele,'timestamp',)){// biar ga spam info
			adaele.textContent = ''
		}
		attr(adaele,'timestamp',t,)
		adaele.textContent += i+'\n'
		return 0
	}
	let div = document.createElement('div')
		div.textContent = i
		div.style.color = warna
		div.classList.add('baru')
		//div.classList.add('bukainfo')
		div.addEventListener('click',f_info,)
		attr(div,'infokey',infokey,)
		attr(div,'timestamp',Date.now(),)
	let inli = que('#infolist')[0]
	inli.appendChild(div)
	//;(11 <= inli.childElementCount) && inli.removeChild(inli.firstElementChild)
}
let f_info = e=>{
	let div = e.currentTarget
	div.classList.remove('baru')
	if(!(e.detail%2)){
		div.classList.toggle('bukainfo')
	}
}
clearinfo.addEventListener('click',e=>{
	infolist.textContent = ''
},)

//setInterval(()=>infolistcla.remove('infoupdate'),1111,)
setInterval(()=>{
	for(let ele of infolist.children){
		ele.style.background = ''
	}
},1111,)
addEventListener('load',()=>tambahinfo(
`Selamat datang di Realtime 3d, silakan -->> DOUBLECLICK <<-- info ini (expand & collapse)

--------------------------
"inijudul"

Saat ini aku mau tunjukkan:
- Perubahan bentuk objek secara realtime
	Aku edit dari Blender,
	objek 3d dikirim ke Supabase,
	supabase mengirim update info ke semua viewer,
	objek 3d tampil

Untuk memulai:
1. Click Show/Hide data (icon mata)
2. Click "Tambah client"
3. Gerakkan kamera, lihat table petunjuk

Maturnuwun

`,'cyan',),)
/*=-=-=-=-=-=-=-=-










=-=-=-=-=-=-=-=-*/
	//mousetext
	
	let datang = e=>{
		let s = attr(e.target,'mousedescr',)
		moutex.textContent = JSON.parse(`"${s}"`)
	}
	let pergi = e=>moutex.textContent = ''
	
	let moutex = que('#moutex')[0]
	/*
	for(let ele of que('[mousedescr]')){
		ele.addEventListener('mouseenter',datang,)
		ele.addEventListener('mouseleave',pergi,)
	}
	*/
	let berimouseevent = e=>{
		if(//kasih event listener
			attr(e.target,'mousedescr',) &&
			!e.target.onmouseenter
		){
			;(e.target.onmouseenter = datang)({target:e.target})
			e.target.onmouseleave = pergi
		}
	}
	addEventListener('mousedown',berimouseevent,)
	addEventListener('mousemove',e=>{
		berimouseevent(e)
		let x = Math.min(e.clientX+11,innerWidth-moutex.clientWidth,)
		let y = Math.min(e.clientY+11,innerHeight-moutex.clientHeight,)
		moutex.style.left = x+'px'
		moutex.style.top = y+'px'
	})
	
	//canvas resize
	export let canv3d = document.querySelector('#canv3d')
	export let canv2d = document.querySelector('#canv2d')
	export let cx3d = canv3d.getContext('webgpu')
	export let cx2d = canv2d.getContext('2d')
	let canvres = e=>{
		let s3d = canv3d.style
		let s2d = canv2d.style
		if(innerWidth/innerHeight > canv3d.width/canv3d.height){
			s3d.height = '100%'
			s3d.width = ''
		}else{
			s3d.height = ''
			s3d.width = '100%'
		}
		s2d.height = s3d.height
		s2d.width = s3d.width
	}
	addEventListener('resize',canvres,)
	canvres()