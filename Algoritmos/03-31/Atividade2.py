# 2-Escrva um programa que lê 3 numeros inteiros e os mostre em ordem crescente
nums = []
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

print(nums)