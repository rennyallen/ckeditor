﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){CKEDITOR.dialog.add("link",function(f){var g=CKEDITOR.plugins.link,i=f.lang.common,e=f.lang.link;return{title:e.title,minWidth:350,minHeight:110,resizable:CKEDITOR.DIALOG_RESIZE_NONE,buttons:[CKEDITOR.dialog.removeButton,CKEDITOR.dialog.okButton],contents:[{id:"info",label:e.info,title:e.info,elements:[{id:"linkType",type:"radio","default":"url",className:"cke_dialog_link_type",items:[[e.toUrl,"url"],[e.toEmail,"email"],["Document","document"]],onChange:function(){var a=this.getDialog(),
b=["urlOptions","emailOptions","documentOptions"],c=this.getValue(),d=a.definition.getContents("upload"),d=d&&d.hidden;"url"==c?(f.config.linkShowTargetTab&&a.showPage("target"),d||a.showPage("upload")):(a.hidePage("target"),d||a.hidePage("upload"));for(d=0;d<b.length;d++){var e=a.getContentElement("info",b[d]);e&&(e=e.getElement().getParent().getParent(),b[d]==c+"Options"?e.show():e.hide())}a.layout()},setup:function(a){this.setValue(a.type||"url")},commit:function(a){a.type=this.getValue()}},{type:"vbox",
id:"urlOptions",className:"cke_dialog_web",children:[{type:"text",id:"url",label:"Web",labelLayout:"horizontal",className:"cke_dialog_url",widths:["70px"],onLoad:function(){this.getInputElement().setAttribute("placeholder","#2 (section number) or http://example.com")},validate:function(){var a=this.getDialog();if(a.getContentElement("info","linkType")&&"url"!=a.getValueOf("info","linkType"))return!0;if(!f.config.linkJavaScriptLinksAllowed&&/javascript\:/.test(this.getValue()))return alert(i.invalidValue),
!1;if(this.getDialog().fakeObj)return!0},setup:function(a){this.allowOnChange=!1;a.web?this.setValue(a.web.url):this.setValue("");this.allowOnChange=!0},onKeyUp:function(){this.onChange()},onChange:function(){var a=this.getValue(),b=!0;if(!a||/^#/.test(a))b=!1;this.getDialog().getContentElement("info","linkTargetType").getElement()[b?"show":"hide"]()},commit:function(a){a.web||(a.web={});a.web.url=this.getValue();this.allowOnChange=!1}},{type:"checkbox",id:"linkTargetType",label:e.openInNewWindow,
className:"cke_dialog_new_window",setup:function(a){a.web&&this.setValue(a.web.openInNewWindow)},commit:function(a){a.web||(a.web={});a.web.openInNewWindow=!!this.getValue()}}]},{type:"text",id:"emailOptions",label:"Address",labelLayout:"horizontal",widths:["70px"],className:"cke_dialog_email",onLoad:function(){this.getInputElement().setAttribute("placeholder","john@example.com")},validate:function(){var a=this.getDialog();if(!a.getContentElement("info","linkType")||"email"!=a.getValueOf("info","linkType"))return!0;
if(!/.+@.+\..+/.test(this.getValue()))return alert(e.invalidEmail),!1},setup:function(a){var b=this.getDialog().getContentElement("info","linkType");b||this.getElement().hide();a.email&&this.setValue(a.email.address);b&&"email"==b.getValue()&&this.select()},commit:function(a){a.email||(a.email={});a.email.address=this.getValue()}},{type:"vbox",id:"documentOptions",children:[{type:"hbox",widths:"10px",children:[{type:"button",id:"upload",label:"Upload file",className:"cke_dialog_upload",onLoad:function(){var a=
this.getElement().getChild([0]),b=a.getHtml();a.setHtml('<i class="entypo-upload"></i> '+b)},onClick:function(){var a=this.getDialog();f.config.uploadCallback(function(b){a.getContentElement("info","uploadUrl").setValue(b||"")})}},{type:"text",id:"uploadUrl",className:"cke_dialog_upload_url",onLoad:function(){this.getInputElement().setAttribute("readonly","readonly")},setup:function(a){a.document?this.setValue(a.document.url):this.setValue("")},onChange:function(){var a=this.getValue(a),b=this.getDialog().getContentElement("info",
"uploadLinkTargetType");this.getElement()[a?"show":"hide"]();b.getElement()[a?"show":"hide"]()},commit:function(a){a.document||(a.document={});a.document.url=this.getValue()}}]},{type:"checkbox",id:"uploadLinkTargetType",label:e.openInNewWindow,className:"cke_dialog_new_window",setup:function(a){a.document&&this.setValue(a.document.openInNewWindow)},commit:function(a){a.document||(a.document={});a.document.openInNewWindow=this.getValue()}}]}]}],onShow:function(){var a=this.getParentEditor(),b=a.getSelection(),
c=null;(c=g.getSelectedLink(a))&&c.hasAttribute("href")?b.getSelectedElement()||b.selectElement(c):c=null;a=g.parseLinkAttributes(a,c);b=!a.type||"email"===a.type&&!a.email.address||"url"===a.type&&!a.web.url||"document"===a.type&&!a.document.url;this.getButton("remove").getElement()[b?"hide":"show"]();this._.selectedElement=c;this.setupContent(a)},onOk:function(){var a={};this.commitContent(a);var b=f.getSelection(),c=g.getLinkAttributes(f,a);if("email"===a.type&&!a.email.address||"url"===a.type&&
!a.web.url||"document"===a.type&&!a.document.url)f.execCommand("unlink");else if(this._.selectedElement){var d=this._.selectedElement,e=d.data("cke-saved-href"),h=d.getHtml();d.setAttributes(c.set);d.removeAttributes(c.removed);if(e==h||"email"==a.type&&-1!=h.indexOf("@"))d.setHtml("email"==a.type?a.email.address:c.set["data-cke-saved-href"]),b.selectElement(d);delete this._.selectedElement}else b=b.getRanges()[0],b.collapsed&&(a=new CKEDITOR.dom.text("email"==a.type?a.email.address:c.set["data-cke-saved-href"],
f.document),b.insertNode(a),b.selectNodeContents(a)),c=new CKEDITOR.style({element:"a",attributes:c.set}),c.type=CKEDITOR.STYLE_INLINE,c.applyToRange(b,f),b.select()},onRemove:function(){f.execCommand("unlink")},onFocus:function(){var a=this.getContentElement("info","linkType");a&&"url"==a.getValue()&&(a=this.getContentElement("info","url"),a.select())}}})})();