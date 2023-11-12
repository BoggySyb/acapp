from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from random import randint
from django.http import JsonResponse

def receive_code(request):
     data = request.GET

     if "errcode" in data:
          return JsonResponse({
               'result': 'apply failed',
               'errcode': data['errcode'],
               'errmsg': data['errmsg'],
          })

     code = data.get('code')
     state = data.get('state')

     if not cache.has_key(state):
          return JsonResponse({
               'result': 'state not exist',

          })
     cache.delete(state)

     apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
     params = {
          'appid': '6206',
          'secret': '07846481d5f74ef8b0d9036f7efaa1fd',
          'code': code,
     }
     access_token_resp = requests.get(apply_access_token_url, params=params).json()

     access_token = access_token_resp['access_token']
     openid = access_token_resp['openid']

     players = Player.objects.filter(openid=openid)
     if players.exists(): # 如果该用户已存在，无需重新获取信息，直接登录即可
          player = players[0]
          return JsonResponse({
               'result': 'success',
               'username': player.user.username,
               'photo': player.photo,
          })

     get_userinfo_url = "https://www.acwing.com/third_party/api/meta/identity/getinfo/"
     params = {
          'access_token': access_token,
          'openid': openid,
     }
     get_userinfo_resp = requests.get(get_userinfo_url, params=params).json()
     username = get_userinfo_resp['username']
     photo = get_userinfo_resp['photo']

     while User.objects.filter(username=username): # 找到一个不存在的用户名
          username += str(randint(0, 9))

     user = User.objects.create(username=username)
     player = Player.objects.create(user=user, photo=photo, openid=openid)

     return JsonResponse({
          'result': 'success',
          'username': player.user.username,
          'photo': player.photo,
     })
