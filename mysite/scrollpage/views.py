from django.shortcuts import render

def scroll_view(request):
    """滚动数字页面视图"""
    return render(request, 'scrollpage/scroll.html')