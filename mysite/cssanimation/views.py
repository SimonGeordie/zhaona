from django.shortcuts import render

def animate_view(request):
    """放大缩小动画页面"""
    return render(request, 'cssanimation/animate.html')

def slide_view(request):
    """左右滑动动画页面"""
    return render(request, 'cssanimation/slide.html')