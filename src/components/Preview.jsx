export default function Preview({htmlContent}){
    return(
        <fieldset>
            <legend>Preview</legend>
            <iframe className="form-control" srcDoc={htmlContent} id="preview-show"></iframe>
        </fieldset>
    )
}