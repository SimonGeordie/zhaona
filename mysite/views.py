from django.shortcuts import render
from django.http import HttpResponse

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