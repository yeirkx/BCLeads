{% comment -%}<!--	Assign Default Template Name -->{% endcomment -%}
{% assign template_name = "_Template - Default" -%}
{% comment -%}<!--	Assign Page Name -->{% endcomment -%}
{% assign page_name = "{module_pagename}" -%}
{% comment -%}<!--	Assign Page Name For Blog -->{% endcomment -%}
{% if globals.get.PostID -%}
{module_data resource="blogposts" version="v3" fields="postTitle" limit="1" where="\{'id':'{{globals.get.PostID}}'\}" collection="BlogPageName"}
{% assign page_name = BlogPageName.items[0].postTitle -%}
{% endif -%}
{% comment -%}<!--	Assign Index Variables -->{% endcomment -%}
{% assign page_index = "" -%}
{% assign template_index = "" -%}
{% assign page_controller = "" -%}
{% assign template_controller = "" -%}
{% comment -%}<!--	Retrieve Template Name -->{% endcomment -%}
{% if globals.get.PostID -%}
{module_data resource="blogs" version="v3" fields="templateId" limit="1" where="\{'posts.postTitle':'{{page_name}}'\}" collection="BlogId"}
{module_data resource="templates" version="v3" fields="name" limit="1" where="\{'id':'{{BlogId.items[0].templateId}}'\}" collection="TemplateName"}
{% elsif globals.get.CatalogueID -%}
	{% assign template_name = "_Template - Shop" -%}
{% elsif globals.get.CartID -%}
	{% assign template_name = "_Template - Shop" -%}
{% else -%}	
{module_data resource="templates" version="v3" fields="name" limit="1" where="\{'pages.name':'{{page_name}}'\}" collection="TemplateName"}
{% endif -%}

{% if TemplateName.items[0] -%}{% assign template_name = TemplateName.items[0].name -%}{% endif -%}
{% comment -%}<!--	Call Page Control Web App -->{% endcomment -%}
{module_webapps id="Page Control" filter="all" collection="PageControl" template=""}

{% comment -%}<!--	Loop Over Page Control -->{% endcomment -%}
{% for item in PageControl.items -%}
{% comment -%}<!--	Retrieve Template Index -->{% endcomment -%}
{% if item.name == template_name -%}
{% assign template_index = forloop.index0 -%}
{% endif -%}
{% comment -%}<!--	Retrieve Page Index -->{% endcomment -%}
{% if item.name == page_name -%}
{% assign page_index = forloop.index0 -%}
{% endif -%}
{% comment -%}<!--	Break Out Of Loop If Template and Page Found -->{% endcomment -%}
{% if page_index != "" and template_index != "" -%}{% break -%}{% endif -%}
{% endfor -%}
{% comment -%}<!--	Assign Variables for Page and Template Index -->{% endcomment -%}
{% if page_index != "" -%}{% assign page_controller = PageControl.items[page_index] -%}{% endif -%}
{% if template_index != "" -%}{% assign template_controller = PageControl.items[template_index] -%}{% endif -%}

