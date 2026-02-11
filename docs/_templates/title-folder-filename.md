# <%* 
const filePath = tp.file.path(true);
const parts = filePath.split('/');
const folderName = parts.length > 1 ? parts[parts.length - 2] : "";
const fileName = tp.file.title;
tR += folderName + " - " + fileName;
%>