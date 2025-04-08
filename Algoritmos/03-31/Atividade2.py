# 2-Escrva um programa que lê 3 numeros inteiros e os mostre em ordem crescente
'''nums = []
nums.append(int(input("Num 1 :")))
nums.append(int(input("Num 2 :")))
nums.append(int(input("Num 3 :")))

#bublle short (relembrar)

for a in range(len(nums)-1): # pq -1 ?
    for i in range(len(nums)-1 - a): #pois na teoria o ultimo já esta no lugar certo, então vai vereficando apartir do proximo
        if nums[i] > nums[i+1]:
            temp = nums[i+1]     
            nums[i+1] = nums[i]
            nums[i] = temp

print(nums)'''

#professor

n1 = int(input("Num 1 :"))
n2 = int(input("Num 2 :"))
n3 = int(input("Num 3 :"))

pri = 0
seg = 0
terc = 0

if n1 < n2 and n1 < n3:
    pri = n1
    if n2< n3:
        seg = n2
        terc = n3
    else:
        seg = n3
        terc = n2
elif n2 < n1 and n2 < n3:
    pri = n2
    if n1 < n3:
        seg = n1
        terc = n3
    else:
        seg = n3
        terc = n1
elif n3 < n1 and n3 < n2:
    pri = n3 
    if n1< n2:
        seg = n1
        terc = n2
    else:
        seg = n2
        terc = n1

print("Os numeros em ordem crescente : {}, {}, {}".format(pri,seg,terc))