export const MM_DD_YYYY = ()=>{
const month = new Date().getMonth();
const day = new Date().getDate();
const year = new Date().getFullYear();

return `${month}-${day}-${year}`
}