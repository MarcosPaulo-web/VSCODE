idade = int(input("Qual sua idade ? "))

if idade >= 18 :
    tituloEleitor = input("Digite seu título de eleitor :")
    print(" Você é maior de idade tendo :{}  e seu titulo : {}".format(idade,tituloEleitor))
else:
    jogo = input("Qual seu jogo preferido ?")
    print("Você é menor de idade e seu jogo preferido é {}".format(jogo))

    print("****FIM****")