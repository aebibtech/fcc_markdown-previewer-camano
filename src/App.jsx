import { useEffect, useState } from 'react'
import { marked } from 'marked'
import axios from 'axios'
import './App.css'
import Editor from './components/Editor'
import Preview from './components/Preview'

export default function App() {
	const [markdown, setMarkDown] = useState("")
	const [html, setHTML] = useState("")
	const styleSheet = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">'

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

	function onEditorChange(event){
		setMarkDown(() => event.target.value)
		setHTML(() => styleSheet + marked.parse(event.target.value))
	}

	return(
		<div className="row gap-0" id="previewer">
			<div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-5">
				<Editor handler={onEditorChange} markdown={markdown} />
			</div>
			<div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-5">
				<Preview htmlContent={html} />
			</div>
		</div>
	)
}
