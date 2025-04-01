#1 - Escreva 1 programa que lê 3 numeros inteiros e mostre o maior

num1 = int(input("Digite o numero 1 :"))
num2 = int(input("Digite o numero 2 :"))
num3 = int(input("Digite o numero 3 :"))
maiorNum = 0

if num1 > num2 and num1 > num3:
    maiorNum = num1
    print("Maior numero : {}".format(maiorNum))

elif num2 > num2 and num2 > num3:
        maiorNum = num2
        print("Maior numero : {}".format(maiorNum))

elif num3 > num1 and num3>num2:
        maiorNum = num3
        print("Maior numero : {}".format(maiorNum))
else:
    print("Um ou mais numeros são iguais")


