import{r as n,j as t}from"./index-Dh3LGQB_.js";function a({message:e,type:i="info",onClose:r}){return n.useEffect(()=>{if(e){const s=setTimeout(()=>{r()},2500);return()=>clearTimeout(s)}},[e,r]),e?t.jsxs("div",{className:`custom-alert ${i}`,style:{position:"fixed",top:"20px",right:"20px",zIndex:2e3,maxWidth:"300px"},role:"alert",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx("span",{style:{flex:1,marginRight:"10px"},children:e}),t.jsx("button",{onClick:()=>setTimeout(r,300),style:{background:"transparent",border:"none",color:"#fff",fontWeight:"bold",fontSize:"1.1rem",cursor:"pointer",lineHeight:"1"},"aria-label":"Cerrar",children:"✕"})]}),t.jsx("div",{style:{position:"absolute",bottom:"0",left:0,height:"3px",width:"100%",background:i==="success"?"rgba(255,255,255,0.6)":"rgba(0,0,0,0.3)",animation:"progressBar 2.5s linear forwards"}}),t.jsx("style",{children:`
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `})]}):null}export{a as A};
