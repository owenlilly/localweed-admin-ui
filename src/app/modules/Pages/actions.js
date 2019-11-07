import ActionHandler from "app/modules/base/actions"
const actions = ActionHandler('PAGES');

export const PREVIEW_PAGE_CONTENT = "PREVIEW_PAGE_CONTENT";


export const previewPageContent = (content) => ({
    type: PREVIEW_PAGE_CONTENT,
    payload: content
});
export const cancelPreviewPageContent = () => ({
    type: PREVIEW_PAGE_CONTENT,
    payload: null

});
export default{
    ...actions,
    PREVIEW_PAGE_CONTENT,
    previewPageContent,
    cancelPreviewPageContent
}
