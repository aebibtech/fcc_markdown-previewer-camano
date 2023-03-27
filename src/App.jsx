import { useEffect, useState } from 'react'
import { marked } from 'marked'
import axios from 'axios'
import './App.css'
import Editor from './components/Editor'
import Preview from './components/Preview'

export default function App() {
	const [markdown, setMarkDown] = useState("")
	const [html, setHTML] = useState("")

	useEffect(function(){
		(async function(){
			try{
				const content = await axios.get('/sample.md')
				setMarkDown(content.data)
				setHTML(() => marked.parse(content.data))
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
		setHTML(() => marked.parse(event.target.value))
	}

	return(
		<div id="previewer">
			<Editor handler={onEditorChange} markdown={markdown} />
			<Preview htmlContent={html} />
		</div>
	)
}
