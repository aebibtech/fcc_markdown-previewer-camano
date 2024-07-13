import { useEffect, useState } from 'react'
import { marked } from 'marked'
import axios from 'axios'
import './App.css'
import Editor from './components/Editor'
import Preview from './components/Preview'

export default function App() {
	const [markdown, setMarkDown] = useState("")
	const [html, setHTML] = useState("")
	const styleSheet = '<link rel="stylesheet" href="/bootstrap.min.css">'

	useEffect(function(){
		(async function(){
			try{
				const content = await axios.get('/sample.md')
				setMarkDown(content.data)
				setHTML(() => styleSheet + marked.parse(content.data))
			}catch(e){
				const errMsg = "No data received."
				setMarkDown(() => errMsg)
				setHTML(() => errMsg)
			}
			marked.setOptions({
				breaks: true
			})
		})()
	}, [])

	function makeTextFile(text) {
		if (text !== null && text !== "") {
			const data = new Blob([text], { type: 'text/plain' })
			return window.URL.createObjectURL(data)
		}
		return "javascript:;";
	}

	function onEditorChange(event){
		setMarkDown(() => event.target.value)
		setHTML(() => styleSheet + marked.parse(event.target.value))
	}

	function onDownload(event){
		const link = document.createElement('a')
		link.setAttribute('download', 'markdown.md')
		link.href = makeTextFile(markdown)
		document.body.appendChild(link)
	
		window.requestAnimationFrame(function () {
			const event = new MouseEvent('click')
			link.dispatchEvent(event)
			document.body.removeChild(link)
		});
	}

	async function onCopy(event){
		await navigator.clipboard.writeText(markdown)
	}

	return(
		<>
		<div className="row gap-0 mb-4" id="previewer">
			<div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-5">
				<Editor handler={onEditorChange} markdown={markdown} />
			</div>
			<div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-5">
				<Preview htmlContent={html} />
			</div>
		</div>
		<div className="row justify-content-center align-items-center mb-2">
			<div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
				<button onClick={onDownload} className="btn btn-success w-100"><i className="fa fa-arrow-down"></i> Download</button>
			</div>
		</div>
		<div className="row justify-content-center align-items-center">
			<div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
				<button onClick={onCopy} className="btn btn-primary w-100"><i className="fa fa-copy"></i> Copy</button>
			</div>
		</div>
		</>
	)
}
