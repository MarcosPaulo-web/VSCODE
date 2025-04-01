#Escreva um programa que mostre na tela um menu de pratos (pelo menos 5),
# cada um associado a um número. Por exemplo:
# 1 - Miojo
# 2 – Ensopado
# Quando um número é selecionado, o programa deve exibir uma breve
# descrição do prato.
# Por exemplo, ao digitar 1, o programa mostra: “Macarrão instantâneo”
end = False
while end == False:

 print('   ----- MENU -----')
 print('   1- Macarrão')
 print('   2- Feijão e Arroz')
 print('   3- Arroz e Camarão')
 print('   4- Feijoada')
 print('   5- Batata recheada')
 print('   ----------------')
 print('')

 pk = int(input('    Escolha uma comida :'))
 print('')

 match pk:
    case 1:
        print('Prato à base de massas, geralmente servido com molho de tomate, queijo ou carne, podendo ser preparado de diversas maneiras, como ao alho e óleo, à bolonhesa, ou com molhos cremosos.')
        end = True  
    case 2:
        print('Clássico da culinária brasileira, é uma combinação simples e nutritiva de feijão cozido com arroz branco, geralmente servido com carne, linguiça ou até ovos fritos.')
        end = True
    case 3:
        print('Prato de arroz cozido, frequentemente preparado com camarões temperados e ingredientes como alho, cebola, pimentão e ervas, trazendo um sabor delicado e fresco ao prato.')
        end = True
    case 4:
        print('Uma deliciosa e tradicional iguaria brasileira, composta por feijão preto cozido com carne de porco, linguiça e outros tipos de carne salgada, geralmente servido com arroz, couve, farofa e laranja.')
        end = True
    case 5:
        print(' Batata assada ou cozida, cortada ao meio e recheada com diversos ingredientes, como queijo, carne moída, frango ou legumes, e finalizada com temperos a gosto.')
        end = True
    case _:
        print('Nenhum prato foi selecionado')