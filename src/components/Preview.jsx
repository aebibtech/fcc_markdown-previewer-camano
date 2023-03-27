export default function Preview({htmlContent}){
    return(
        <fieldset>
            <legend>Preview area</legend>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="preview"></div>
        </fieldset>
    )
}