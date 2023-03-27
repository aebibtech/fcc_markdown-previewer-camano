export default function Preview({htmlContent}){
    return(
        <fieldset>
            <legend>Preview area</legend>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="preview"></div>
            <iframe srcdoc={htmlContent} id="preview-show"></iframe>
        </fieldset>
    )
}