{% comment -%}<!--	Change These Variables -->{% endcomment -%}
{% assign header_image_field_name = "Header Image (1440px X 360px)" %}
{% assign header_headline_field_name = "Headline" %}
{% assign header_disableBreadcrumbs_field_name = "Disable Breadcrumbs" %}
{% assign header_disable_secureDomain_field_name = "Secure Domain" %}

{% comment -%}<!--	Assign Variables -->{% endcomment -%}
{% assign header_image = "" -%}
{% assign header_headline = "" -%}
{% assign secure_switch_class = "" -%}

{% comment -%}<!--	Assign Template Header Data -->{% endcomment -%}
{% if template_controller != "" -%}
{% comment -%}<!--	Assign Header Image -->{% endcomment -%}
{% assign header_image = template_controller.[header_image_field_name] -%}
{% comment -%}<!--	Assign Header Headline -->{% endcomment -%}
{% assign header_headline = template_controller.[header_headline_field_name] -%}
{% comment -%}<!--	Assign Disable Breadcrumbs -->{% endcomment -%}
{% assign disableBreadcrumbs = template_controller.[header_disableBreadcrumbs_field_name] -%}
{% comment -%}<!--	Assign Secure Domain -->{% endcomment -%}
{% assign secure_switch = template_controller.[header_disable_secureDomain_field_name] -%}
{% endif -%}

{% comment -%}<!--	Assign Page Header Date -->{% endcomment -%}
{% if page_controller != "" -%}
{% comment -%}<!--	Assign Header Image If Specified -->{% endcomment -%}
{% if page_controller.[header_image_field_name] != "" -%}
{% assign header_image = page_controller.[header_image_field_name] -%}
{% endif -%}
{% comment -%}<!--	Assign Header Headline If Specified Otherwise Assign Page Name -->{% endcomment -%}
{% if page_controller.[header_headline_field_name] != "" -%}
{% assign header_headline = page_controller.[header_headline_field_name] -%}
{% elsif header_headline == "" -%}
{% assign header_headline = page_name -%}
{% endif -%}
{% comment -%}<!--	Assign Disable Breadcrumbs -->{% endcomment -%}
{% unless disableBreadcrumbs -%}
{% assign disableBreadcrumbs = page_controller.[header_disableBreadcrumbs_field_name] -%}
{% endunless -%}
{% comment -%}<!--	Assign Secure Domain -->{% endcomment -%}
{% unless secure_switch -%}
{% assign secure_switch = page_controller.[header_disable_secureDomain_field_name] -%}
{% endunless -%}
{% endif -%} 

{% comment -%}<!--	No Template Headline & No Page Headline Assign Page Name -->{% endcomment -%}
{% if header_headline == "" -%}{% assign header_headline = page_name -%}{% endif -%}
{% if secure_switch -%}{% assign secure_switch_class = "js-secure-switch" -%}{% endif -%}
{% comment -%}<!--	Header Html -->{% endcomment -%}
<div class="{{secure_switch_class}} inner-hero banner" style="background-image:url({{header_image}})">
  <p>{{header_headline}}</p>
  {% unless disableBreadcrumbs -%}
  <div class="breadcrumbs">{module_breadcrumbs,}</div>
  {% endunless -%} </div>
