palavra = input('Digite uma palavra :')
nova = ''
for i in palavra:
    if (i == 'a'):
       nova += 'u'
    else:
      nova += i
print(nova)