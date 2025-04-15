for i in range (5): #0 a 4
    print(i)

print('--------------------------------------')

for i in range (1,7):
    print(i)

qtd = int(input('Quantos alunos :'))

for i in range(qtd):
    nome = input('Nome aluno :')
    n1 = float(input('Nota 1 :'))
    n2 = float(input('Nota 2 :'))
    n3 = float(input('Nota 3 :'))
    media = (n1 + n2+ n3)/3
    if media >= 6:
        print('Aluno(a) {} aprovado(a)'.format(nome))
    else:
        print('Aluno(a) {} reprovado(a)'.format(nome))
