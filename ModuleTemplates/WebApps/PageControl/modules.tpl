{% comment -%}<!--	Change These Variables -->{% endcomment -%}
{% assign module_field_name = "Page Module" %}

{% comment -%}<!--	Assign Template Module Data -->{% endcomment -%}

{% if page_controller != "" -%}
    {% for i in (1..6) -%}
    {% capture pageModule -%}{{module_field_name}} {{i}}_id{% endcapture -%} 
    {% if page_controller.[pageModule] and page_controller.[pageModule] != "" -%}
    {module_webapps id="Page Modules" filter="item" itemId="{{page_controller.[pageModule]}}" hideEmptyMessage="true"}
    {% endif -%}
    {% endfor -%}
{% elseif template_controller != "" -%}
    {% for i in (1..6) -%}
    {% capture pageModule -%}{{module_field_name}} {{i}}_id{% endcapture -%} 
    {% if template_controller.[pageModule] and template_controller.[pageModule] != "" -%}
    {module_webapps id="Page Modules" filter="item" itemId="{{template_controller.[pageModule]}}" hideEmptyMessage="true"}
    {% endif -%}
    {% endfor -%}
{% endif -%}
