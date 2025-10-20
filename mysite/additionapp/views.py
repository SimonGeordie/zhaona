from django.shortcuts import render

def addition_view(request):
    """
    渲染React加法计算器页面
    """
    return render(request, 'additionapp/index.html')