from django.shortcuts import render

def singlepage_view(request):
    """
    单页面应用视图函数
    渲染包含JavaScript DOM操作的单页面应用
    """
    return render(request, 'singlepage/singlepage.html')