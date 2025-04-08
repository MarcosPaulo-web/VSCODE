'''Cada produto no estoque contém as seguintes informações:
Nome do produto
Quantidade atual do produto em estoque.
Quantidade mínima permitida.
Quantidade máxima permitida.
O usuário deve informar os dados do produto e qual operação que deseja fazer:
1 - Adicionar no estoque
2 - retirar do estoque
Ao escolher a operação, deve perguntar quantos itens deseja adicionar ou retirar, conforme a operação
escolhida.
Verificar se a operação pode ser feita, considerando a quantidade mínima ou a quantidade máxima e
tomar ações apropriadas (exibir mensagens de alerta no caso de operação não permitida e exibir o novo
estoque no caso de a operação ser permitida).
'''
print('\nAdicionar os dados do estoque :\n')
nmProduto = input('Nome do produto :')
quantidadeProduto = int(input('Quantidade do produto :'))
quantidadeMínima = int(input('Quantidade mínima do produto :'))
quantidadeMaxima = int(input('Quantidade máxima do produto :'))

if quantidadeProduto >= quantidadeMínima and quantidadeProduto <= quantidadeMaxima :


    print('Estoque atual :')
    print(' nome : {} \n quantidade : {} \n quantidade mínima : {} \n quantidade máxima : {} \n'.format(nmProduto,quantidadeProduto,quantidadeMínima,quantidadeMaxima))

    print('-----Menu-----\n')
    print('1- Adicionar no estoque')
    print('2- retirar do estoque')
    print('\n--------------')
    print('')
    op = int(input('---    '))
    print('')

    if(op == 1):
        add = int(input('Quantos produtos pretende adicionar :'))
        quantidadeProduto = quantidadeProduto + add
        if quantidadeProduto >= quantidadeMínima and quantidadeProduto <= quantidadeMaxima :
            print('\nProduto cadastrado com sucesso !!!\n')
            print(' nome : {} \n quantidade : {} \n quantidade mínima : {} \n quantidade máxima : {} \n'.format(nmProduto,quantidadeProduto,quantidadeMínima,quantidadeMaxima))
        elif quantidadeMínima > quantidadeProduto:
            print('\nQuantidade do produto menor que o mínimo possivel !!! ')
        elif quantidadeMaxima < quantidadeProduto:
            print('\nQuantidade do produto Maior que a maxima possivel!!!')
    elif op == 2:
        retirados = int(input('Quantos itens deseja retirar :'))
        quantidadeProduto = quantidadeProduto - retirados

        if quantidadeProduto >= quantidadeMínima and quantidadeProduto <= quantidadeMaxima :
            print('\nProduto retirado com sucesso !!!\n')
            print(' nome : {} \n quantidade : {} \n quantidade mínima : {} \n quantidade máxima : {} \n'.format(nmProduto,quantidadeProduto,quantidadeMínima,quantidadeMaxima))
        elif quantidadeMínima > quantidadeProduto:
            print('\nQuantidade do produto menor que o mínimo possivel !!! ')
        elif quantidadeMaxima < quantidadeProduto:
            print('\nQuantidade do produto Maior que a maxima possivel!!!')
            print('\n{} produtos retirados do estoque \n'.format(retirados))


    else:
        print('O numero inserido não existe')

elif quantidadeMínima > quantidadeProduto:
            print('\nQuantidade do produto menor que o mínimo possivel !!! ')
elif quantidadeMaxima < quantidadeProduto:
            print('\nQuantidade do produto Maior que a maxima possivel!!!')
        