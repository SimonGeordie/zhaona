from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    """项目主页 - 汇总所有页面链接"""
    # 所有页面的信息
    pages = [
        {
            'title': '学生信息页面',
            'description': '显示学生基本信息',
            'url': '/student/',
            'category': '基础信息'
        },
        {
            'title': '纯文本学生信息',
            'description': '返回纯文本格式的学生信息',
            'url': '/student/text/',
            'category': '基础信息'
        },
        {
            'title': '单页面应用',
            'description': '单页面应用演示',
            'url': '/singlepage/',
            'category': '页面应用'
        },
        {
            'title': '滚动页面',
            'description': '滚动页面效果演示',
            'url': '/scroll/',
            'category': '页面应用'
        },
        {
            'title': '无限滚动',
            'description': '无限滚动加载内容',
            'url': '/infinitescroll/',
            'category': '页面应用'
        },
        {
            'title': 'CSS动画 - 放大缩小',
            'description': 'CSS放大缩小动画效果演示',
            'url': '/cssanimation/',
            'category': '动画效果'
        },
        {
            'title': 'CSS动画 - 左右滑动',
            'description': 'CSS左右滑动动画效果演示',
            'url': '/cssanimation/slide/',
            'category': '动画效果'
        },
        {
            'title': 'React加法计算器',
            'description': '基于React的加法计算器应用',
            'url': '/addition/',
            'category': 'React应用'
        }
    ]
    
    # 按类别分组
    categories = {}
    for page in pages:
        if page['category'] not in categories:
            categories[page['category']] = []
        categories[page['category']].append(page)
    
    return render(request, 'home.html', {'categories': categories})

def student_info(request):
    """显示学生信息页面"""
    student_data = {
        'student_id': '20231201054',
        'name': '赵娜',
        'class_name': '医学信息工程2023班'
    }
    return render(request, 'student_info.html', {'student': student_data})

def student_info_text(request):
    """返回纯文本格式的学生信息"""
    student_info = f"hello\n学号：20231201054，姓名：赵娜，班级：医学信息工程2023班"
    return HttpResponse(student_info, content_type='text/plain; charset=utf-8')