export default function Editor({ handler, markdown }){
    return(
        <fieldset>
            <legend>Enter markdown here</legend>
            <textarea onChange={handler} value={markdown} name="editor" id="editor" cols="30" rows="10"></textarea>
		</fieldset>
    )
}