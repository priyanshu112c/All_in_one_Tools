const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BrHuCUya.js","assets/index-Da3KohQi.js","assets/index-DrPmB-J1.css","assets/_commonjs-dynamic-modules-TDtrdbi3.js","assets/jspdf.es.min-7CYyzrtm.js","assets/typeof-QjJsDpFa.js"])))=>i.map(i=>d[i]);
import{c as U,r as T,_,j as h,F}from"./index-Da3KohQi.js";import{T as I}from"./ToolWrapper-BYvtdxw-.js";import{F as j}from"./FileSaver.min-CnzyOX6g.js";/**
 * @license lucide-react v1.25.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],k=U("file-spreadsheet",V);function E({title:m,icon:c,description:t,accept:s,onConvert:i,outputLabel:f}){const[a,g]=T.useState(null),[y,x]=T.useState(!1),[e,o]=T.useState(""),u=T.useCallback(async()=>{if(a){x(!0),o("");try{await i(a,o)}catch(n){o("Error: "+n.message)}finally{x(!1)}}},[a,i]),d=n=>{const r=n.target.files[0];g(r),o("")};return h.jsxDEV(I,{title:m,icon:c,description:t,children:h.jsxDEV("div",{className:"space-y-4",children:[h.jsxDEV("div",{children:[h.jsxDEV("label",{className:"label",children:"Select File"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:36,columnNumber:21},this),h.jsxDEV("input",{type:"file",accept:s,onChange:d,className:"input-field"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:37,columnNumber:21},this)]},void 0,!0,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:35,columnNumber:17},this),a&&h.jsxDEV("div",{className:"card p-3 flex items-center gap-3",children:[h.jsxDEV("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:a.name},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:46,columnNumber:25},this),h.jsxDEV("span",{className:"text-xs text-gray-400",children:["(",(a.size/1024).toFixed(1)," KB)"]},void 0,!0,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:47,columnNumber:25},this)]},void 0,!0,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:45,columnNumber:21},this),h.jsxDEV("button",{className:"btn-primary w-full",onClick:u,disabled:!a||y,children:y?"Converting...":"Convert & Download"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:50,columnNumber:17},this),e&&h.jsxDEV("div",{className:`card p-3 text-sm ${e.startsWith("Error")?"text-red-500":"text-green-500"}`,children:e},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:58,columnNumber:21},this)]},void 0,!0,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:34,columnNumber:13},this)},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:33,columnNumber:9},this)}async function R(m,c=2){const t=m.getViewport({scale:c}),s=document.createElement("canvas");s.width=t.width,s.height=t.height;const i=s.getContext("2d");return i.fillStyle="#FFFFFF",i.fillRect(0,0,s.width,s.height),await m.render({canvasContext:i,viewport:t}).promise,{canvas:s,viewport:t}}function O(m){return new Promise(c=>{m.toBlob(async t=>{const s=await t.arrayBuffer();c(new Uint8Array(s))},"image/png")})}function H(m){return m.toDataURL("image/png")}function $(){const m=T.useCallback(async(c,t)=>{t("Reading PDF...");const s=await c.arrayBuffer(),i=await _(()=>import("./pdf-D35c9CSk.js"),[]);i.GlobalWorkerOptions.workerSrc=new URL("/assets/pdf.worker.min-DEtVeC4l.mjs",import.meta.url).href;const f=await i.getDocument({data:s}).promise,{Document:a,Packer:g,Paragraph:y,ImageRun:x,AlignmentType:e}=await _(async()=>{const{Document:r,Packer:D,Paragraph:P,ImageRun:v,AlignmentType:b}=await import("./index-BMOhQabZ.js");return{Document:r,Packer:D,Paragraph:P,ImageRun:v,AlignmentType:b}},[]);t("Rendering pages...");const o=[];for(let r=1;r<=f.numPages;r++){t(`Rendering page ${r} of ${f.numPages}...`);const D=await f.getPage(r),{canvas:P,viewport:v}=await R(D,2),b=await O(P),w=756e4,l=Math.round(w*(v.height/v.width));o.push({pngBytes:b,emuWidth:w,emuHeight:l})}t("Building DOCX...");const u=o.map((r,D)=>{const P=new x({data:r.pngBytes,transformation:{width:r.emuWidth,height:r.emuHeight}});return new y({children:[P],alignment:e.CENTER,...D>0?{pageBreakBefore:!0}:{}})}),d=new a({sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:0,bottom:0,left:0,right:0}}},children:u}]}),n=await g.toBlob(d);j.saveAs(n,c.name.replace(/\.pdf$/i,"")+".docx"),t("Conversion complete! File downloaded.")},[]);return h.jsxDEV(E,{title:"PDF to DOCX",icon:F,description:"Convert PDF documents to Word format — preserves layout, images, tables, fonts & styling",accept:".pdf",onConvert:m,outputLabel:"DOCX"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:172,columnNumber:9},this)}function B(){const m=T.useCallback(async(c,t)=>{t("Reading PDF...");const s=await c.arrayBuffer(),i=await _(()=>import("./pdf-D35c9CSk.js"),[]);i.GlobalWorkerOptions.workerSrc=new URL("/assets/pdf.worker.min-DEtVeC4l.mjs",import.meta.url).href;const f=await i.getDocument({data:s}).promise;t("Rendering pages...");const a=[];for(let e=1;e<=f.numPages;e++){t(`Rendering page ${e} of ${f.numPages}...`);const o=await f.getPage(e),{canvas:u,viewport:d}=await R(o,2),n=H(u);a.push({dataUrl:n,width:d.width,height:d.height})}t("Building XLSX...");let g="";a.forEach((e,o)=>{const u=e.height/e.width,d=800,n=Math.round(d*u);g+=`<div style="page-break-after: always; margin: 0; padding: 10px; text-align: center;">
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #333; font-family: Arial, sans-serif;">
                    Page ${o+1}
                </div>
                <img src="${e.dataUrl}" width="${d}" height="${n}"
                     style="max-width: 100%; height: auto; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
            </div>`});const y=`<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if gte mso 9]>
    <xml>
        <x:ExcelWorkbook>
            <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                    <x:Name>PDF Pages</x:Name>
                    <x:WorksheetOptions>
                        <x:DisplayGridlines/>
                    </x:WorksheetOptions>
                </x:ExcelWorksheet>
            </x:ExcelWorksheets>
        </x:ExcelWorkbook>
    </xml>
    <![endif]-->
    <style>
        body { margin: 0; padding: 0; background: #fff; }
        img { -ms-interpolation-mode: bicubic; }
    </style>
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 10px;">
                ${g}
            </td>
        </tr>
    </table>
</body>
</html>`,x=new Blob([y],{type:"application/vnd.ms-excel"});j.saveAs(x,c.name.replace(/\.pdf$/i,"")+".xls"),t("Conversion complete! File downloaded.")},[]);return h.jsxDEV(E,{title:"PDF to Excel",icon:k,description:"Convert PDF documents to Excel format — preserves layout, images, tables, fonts & styling",accept:".pdf",onConvert:m,outputLabel:"XLSX"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:272,columnNumber:9},this)}function X(){const m=T.useCallback(async(c,t)=>{t("Reading DOCX...");const s=await c.arrayBuffer(),i=await _(()=>import("./index-BrHuCUya.js").then(l=>l.i),__vite__mapDeps([0,1,2,3])),a=(await i.convertToHtml({arrayBuffer:s,convertImage:i.images.imgElement(l=>l.read("base64").then(p=>({src:`data:${l.contentType};base64,${p}`})))})).value;if(!a||a.trim().length===0)throw new Error("No content found in DOCX file");t("Generating PDF...");const g=(await _(async()=>{const{default:l}=await import("./jspdf.es.min-7CYyzrtm.js");return{default:l}},__vite__mapDeps([4,1,2,5]))).default,y=(await _(async()=>{const{default:l}=await import("./html2canvas.esm-CBrSDip1.js");return{default:l}},[])).default,x=`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            background: #fff;
            padding: 72pt;
            max-width: 100%;
        }
        h1 { font-size: 24pt; font-weight: bold; margin: 18pt 0 9pt; }
        h2 { font-size: 18pt; font-weight: bold; margin: 14pt 0 8pt; }
        h3 { font-size: 14pt; font-weight: bold; margin: 10pt 0 6pt; }
        h4 { font-size: 12pt; font-weight: bold; margin: 8pt 0 4pt; }
        p { margin: 6pt 0; }
        table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
        td, th { border: 1px solid #000; padding: 5pt 8pt; text-align: left; vertical-align: top; }
        th { background-color: #e8e8e8; font-weight: bold; }
        img { max-width: 100%; height: auto; }
        ul, ol { margin: 6pt 0 6pt 30pt; }
        li { margin: 3pt 0; }
        blockquote { margin: 8pt 24pt; font-style: italic; color: #444; border-left: 3px solid #ccc; padding-left: 12pt; }
        pre, code { font-family: 'Courier New', Courier, monospace; background: #f5f5f5; padding: 1pt 3pt; border-radius: 2pt; }
        pre { padding: 8pt; overflow-x: auto; }
    </style>
</head>
<body>${a}</body>
</html>`,e=document.createElement("div");e.innerHTML=x,e.style.position="absolute",e.style.left="-9999px",e.style.top="0",e.style.width="794px",e.style.background="#fff",document.body.appendChild(e),await new Promise(l=>setTimeout(l,1500));const o=await y(e,{scale:2,useCORS:!0,allowTaint:!0,logging:!1,width:e.scrollWidth,height:e.scrollHeight,onclone:l=>{const p=l.querySelectorAll("img");return Promise.all(Array.from(p).map(C=>new Promise(N=>{C.complete?N():(C.onload=N,C.onerror=N)})))}});document.body.removeChild(e);const u=595.28,d=841.89,n=new g("p","pt","a4"),r=o.width,D=o.height,P=u/r,v=D*P;let b=v,w=0;for(n.addImage(o,"PNG",0,w,u,v),b-=d;b>0;)w-=d,n.addPage(),n.addImage(o,"PNG",0,w,u,v),b-=d;n.save(c.name.replace(/\.docx$/i,"")+".pdf"),t("Conversion complete! File downloaded.")},[]);return h.jsxDEV(E,{title:"DOCX to PDF",icon:F,description:"Convert Word documents to PDF — preserves layout, images, tables, fonts & styling",accept:".docx",onConvert:m,outputLabel:"PDF"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:415,columnNumber:9},this)}function Y(){const m=T.useCallback(async(c,t)=>{t("Reading XLSX...");const s=await c.arrayBuffer(),i=await _(()=>import("./xlsx-D_0l8YDs.js"),[]),f=i.read(s,{type:"array"});t("Generating PDF...");let a="";const g=f.SheetNames;for(let p=0;p<g.length;p++){const C=g[p],N=f.Sheets[C],L=i.utils.sheet_to_html(N,{editable:!1});a+=`
                <div class="sheet-section" style="page-break-after: ${p<g.length-1?"always":"avoid"}; margin-bottom: 24pt;">
                    <div style="font-size: 18pt; font-weight: bold; margin-bottom: 12pt; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; border-bottom: 2px solid #4472C4; padding-bottom: 6pt;">
                        ${C}
                    </div>
                    <div style="overflow-x: auto;">
                        ${L}
                    </div>
                </div>`}if(!a)throw new Error("No data found in XLSX file");const y=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 10pt;
            color: #000;
            background: #fff;
            padding: 36pt;
            margin: 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            font-size: 10pt;
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
        }
        td, th {
            border: 1px solid #d0d0d0;
            padding: 4pt 8pt;
            text-align: left;
            vertical-align: top;
            white-space: nowrap;
        }
        th {
            background-color: #4472C4;
            color: #fff;
            font-weight: bold;
        }
        tr:nth-child(even) td {
            background-color: #f5f7fa;
        }
        .sheet-section {
            margin-bottom: 24pt;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        td[data-num-fmt] {
            font-variant-numeric: tabular-nums;
        }
    </style>
</head>
<body>${a}</body>
</html>`,x=(await _(async()=>{const{default:p}=await import("./jspdf.es.min-7CYyzrtm.js");return{default:p}},__vite__mapDeps([4,1,2,5]))).default,e=(await _(async()=>{const{default:p}=await import("./html2canvas.esm-CBrSDip1.js");return{default:p}},[])).default,o=document.createElement("div");o.innerHTML=y,o.style.position="absolute",o.style.left="-9999px",o.style.top="0",o.style.width="900px",o.style.background="#fff",document.body.appendChild(o),await new Promise(p=>setTimeout(p,1e3));const u=await e(o,{scale:2,useCORS:!0,allowTaint:!0,logging:!1,width:o.scrollWidth,height:o.scrollHeight});document.body.removeChild(o);const d=841.89,n=595.28,r=new x("l","pt","a4"),D=u.width,P=u.height,v=d/D,b=P*v;let w=b,l=0;for(r.addImage(u,"PNG",0,l,d,b),w-=n;w>0;)l-=n,r.addPage(),r.addImage(u,"PNG",0,l,d,b),w-=n;r.save(c.name.replace(/\.(xlsx|xls)$/i,"")+".pdf"),t("Conversion complete! File downloaded.")},[]);return h.jsxDEV(E,{title:"Excel to PDF",icon:k,description:"Convert Excel spreadsheets to PDF — preserves tables, formatting & styling",accept:".xlsx,.xls",onConvert:m,outputLabel:"PDF"},void 0,!1,{fileName:"D:/Priyanshu/import/sTUDY/courses/+/computer/Project/auto_short/src/tools/FileConversionTools.jsx",lineNumber:569,columnNumber:9},this)}export{X as DocxToPdf,$ as PdfToDocx,B as PdfToXlsx,Y as XlsxToPdf};
