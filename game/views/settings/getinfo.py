from django.http import JsonResponse
from game.models.player.player import Player

def getinfo_AcApp(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result' : 'success',
        'username' : player.user.username,
        'photo' : player.photo,
    })

def getinfo_Web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': '未登录',
        })
    else:
        player = Player.objects.all()[0]
        return JsonResponse({
            'result': 'success',
            'username': player.user.username,
            'photo': player.photo,
        })

def getinfo(request):
    platform = request.GET.get('platform')
    if platform == 'acapp':
        return getinfo_AcApp(request)
    elif platform == 'web':
        return getinfo_Web(request)
