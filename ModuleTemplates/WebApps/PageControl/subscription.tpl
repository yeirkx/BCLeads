{% comment -%}<!--	Change These Variables -->{% endcomment -%}
{% assign enable_subscription = "Enable Subscription" %}
{% assign subscription = "Sunscription" %}
{% comment -%}<!--	Assign Template Subscription -->{% endcomment -%}

{% if page_controller != "" -%}
	{% if page_controller.[enable_subscription]  -%}
    	{%assign left_class = "col-md-9"%}
        {%assign right_class = "col-md-3"%}
        {%assign display = "block"%}
    {%else%}
    	{%assign left_class = "col-md-12"%}
        {%assign right_class = ""%}
        {%assign display = "none"%}
    {% endif %}
{% elsif template_controller != "" -%}
	{% if template_controller.[enable_subscription]  -%}
    	{%assign left_class = "col-md-9"%}
        {%assign right_class = "col-md-3"%}
        {%assign display = "block"%}
    {%else%}
    	{%assign left_class = "col-md-12"%}
        {%assign right_class = ""%}
        {%assign display = "none"%}
    {% endif %}
{% endif%} -->
