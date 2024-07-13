export default function Preview({htmlContent}){
    return(
        <fieldset>
            <legend>Preview area</legend>
            <iframe className="form-control" srcDoc={htmlContent} id="preview-show"></iframe>
        </fieldset>
    )
}