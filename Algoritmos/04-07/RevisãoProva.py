nome = input('Nome do produto :')
qntAtual = int(input("Quantidade atual :"))
max = int(input('Estoque máximo :'))
min = int(input('Estoque mínimo :'))
op = int(input('1 - entrada do estoque\n 2 - Saída do estoque'))
qtd = 0

if op == 1:
    qnt = int(input('Quantas unidades para entrada ?'))
    if (qntAtual + qtd) > max : 
        print('Ultrapassa o estoque máximo')
    else:
        qntAtual = qntAtual + qnt
elif op == 2:
    qnt = int(input('Quantas unidades para saida ?'))
    if (qntAtual - qtd) < min : 
        print('Ultrapassa o estoque minímo')
    else:
        qntAtual = qntAtual - qnt

print('Novo estoque {}'.format(qntAtual))