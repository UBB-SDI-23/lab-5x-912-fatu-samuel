from rest_framework.pagination import PageNumberPagination

class DefaultPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 50
    
    page_size_query_param = 'page_size'
    page_query_param = 'page'