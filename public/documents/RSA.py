import random


class keyGenerator(object) :
	def __init__(self):
			# Don't create a key because this object may only be used for encrypting
		self.minRange = 50
		self.publicKeyFlag = False
		self.privateKeyFlag = False
		self.p = 1
		self.q = 1
		self.phiN = 1
		self.N = 1
		self.min = 1
		self.max = 1
		self.sliceLength = 1
		self.e = 1
		self.d = 1
	
		# Generates everything associated with a key
	def generateNewKey(self, min, max):
			# max and min define range for acceptable random primes
		self.max = max
		self.min = min
		if self.max - self.min < self.minRange + 1 or self.min < 0:
			print("\n\n*************\nKeyGenerator Range is wrong!\nSetting to (0,200)\n*************\n\n")
			self.min = 0
			self.max = 200
		self.privateKeyFlag = True
		self.publicKeyFlag = True
		
		self.generatePandQ()
		self.n = self.p * self.q
			# phiN = (p - 1)(q - 1)
		self.phiN = self.n - self.p - self.q + 1
		
			# Set e to the classical public key
		self.e = 65537
			# If e is too big find suitable e that's smaller than phiN
		if self.e > (self.min-1)**2:
			self.e = self.randomPrime( 5, self.phiN - 1)
			while not(self.modInverse(self.e, self.phiN)[1] == 1):
				self.e = self.randomPrime(int(self.minRange / 2), self.phiN - 1)
			# Otherwise, we change p and q so that we can use classical public key e
		else:
				# This is the one condition that e has to satisfy
			while not(self.modInverse(self.e, self.phiN)[1] == 1):
				self.generatePandQ()
					# Make sure e doesn't equal one of the primes
				while not(self.e == self.p or self.e == self.q):
					self.generatePandQ()
				self.n = self.p * self.q
					# phiN = (p - 1)(q - 1)
				self.phiN = self.n - self.p - self.q + 1
		
			# Now we can set the private key
		self.d = self.modInverse(self.e, self.phiN)[0]
		
		# Find 2 distinct primes in given range, and that are different to e
	def generatePandQ(self):
			# Finding primes that are of different orders (****This doesn't make them different orders!****)
			# of each other if range is big enough
		range = self.max - self.min
		self.p = self.randomPrime(self.min, self.max - int(range/2))
		counter = 0
		self.q = self.randomPrime(self.min + int(range/2), self.max)
		while self.q == self.p and counter < 1000:
			self.q = self.randomPrime(self.min + int(range/2), self.max)
			counter = counter + 1
		if counter >= 1000:
			print("\n\n*************\nTime out finding prime q != p in KeyGenerator!!!\n*************\n\n")

		# returns true for prime n - This could be WAY more efficient!
	def isPrime(self, n):
		if n < 2:
			return False
		elif n == 2:
			return True
		elif n%2 == 0:
			return False
		else:
			i = 3
			m = int(n**0.5 + 1)
			while i <= m:
				if n%i == 0:
					return False
				i = i+2
			return True
		
		# returns a random prime between a and b
	def randomPrime(self, a, b):
			# range has to be a decent size to be able to find a prime in range
		if b - a < self.minRange and a < 0:
			return(0)
			# look for random prime in given range
		else:
			foundPrime = False
			n = random.randint(a,b)
			counter = 1
			while not(self.isPrime(n)) and counter < 2*(b-a):
				n = random.randint(a,b)
				counter = counter + 1
					# If searched for a decent amount of time break out
					# Searching randomly, so using 2*(b-a) because may look at the same number multiple times
			if counter > 2*(b-a):
				print("\n\n************\nTaking too long to find prime in foundPrime!\n***************\n\n")
				return(0)
			else:
				return(n)
	
		# Returns (t0,r0) where t0 is the modulo inverse of a (mod n)
		# and r0 is gcd(a,n)
		# This uses the Extended Euclidean Algorithm
	def modInverse(self, a, n):
		if a < 0 or n < 0 or n < a:
			print("\n\n************\nmodInverse inputs wrong!\n************\n\n")
			return(0)
		r0 = n
		r1 = a
		t0 = 0
		t1 = 1
		q1 = int(r0/r1)
			# dummy values
		r2 = -1
		t2 = -1
			# Check if we have got to the end of the algorithm
		while True:
			r2 = r0 - q1 * r1
			if r2 == 0:
					# Make sure the inverse is in [1, n-1]
				return([t1%n, r1])
			t2 = t0 - q1 * t1
			q1 = int(r1/r2)
			
				# discard old values and have new values in r1, t1, q1
			r0 = r1
			r1 = r2
			t0 = t1
			t1 = t2
		return([0,0])
	
	def printKeyDetails(self):
		print("\n******************\nKey Details:\n")
		print("p = " +str(self.p))
		print("q = " +str(self.q))
		print("n = " +str(self.n))
		print("phiN = " +str(self.phiN))
		print("Public Key: e = " +str(self.e))
		print("gcd(e, phiN) = " +str(self.modInverse(self.e, self.phiN)[1]))
		print("Private Key: d = " +str(self.d))
		print("Min range for Primes = " +str(self.minRange))
		print("min = " +str(self.min))
		print("max = " +str(self.max))
		print("\n******************\n")
	
		# Given message m, output the encrypted message in a string array
	def encrypt(self, m):
			# The given message will be split into the array such that each
			# entry will contain a slice of the message small enough to be encrypted
		if not(self.publicKeyFlag):
			print("\n************\nNo public key has been set so cannot encrypt!\n************\n")
			return(0)
		n = self.OutOfASCII(m)
		print("\nASCII number message n = " +n)
		N = self.slice(str(n))
		print("sliced n, N = ")
		for i in range(len(N)):
			print(N[i])
		cryptN = []
		for i in range( len(N) ):
			cryptN.append( str( self.e * int(N[i]) % self.phiN ) )
		print("cryptN = ")
		for i in range(len(N)):
			print(cryptN[i])
		return(cryptN)
	
		# Given encrypted message m as a string array cryptN, output the decrypted message
	def decrypt(self, cryptN):
		if not(self.privateKeyFlag):
			print("\n************\nNo private key has been set so cannot decrypt!\n************\n")
			return(0)
		N = []
		for i in range( len(cryptN) ):
			N.append( str( self.d * int(cryptN[i]) % self.phiN ) )
		n = self.unSlice(N)
		m = self.InToASCII(n)
		return(m)
	
		# Given a number n, returns a string of digits in base 256
	def inToBase256(self,n):
		n256 = ""
		while n > 0:
			tmp = n % 256
			n = n - tmp
			n = int(n / 256)
			tmp = str(tmp)
				# To create it in base 256 each 'digit' is 3 digits long in base 10
				# e.g. 260 in base 256 would be 14, but will be represented as 001004 here
			while len(tmp) < 3:
				tmp = "0" + tmp
			n256 = tmp + n256
		if not(n == 0):
			print("\n***********\nin base256 we don't represent n properly\n*************\n")
		return(n256)
	
		# Returns string n256 as number n in base 10
	def outOfBase256(self, n256):
		length = len(n256)
		n = 0
		for i in range( int( len(n256)/3 ) ):
			tmp = n256[length - 3*(i + 1) : length -  3*i - 1]
			n = n + int(tmp) * (256 ** i)
		return(n)
	
		# Returns a string array of M such that each entry contains a piece of m with 
		# digits less than sliceLength
	def slice(self, m):
			# Note: the string should be length 3 the whole way through because
			# ASCII characters have a 3 digit representation
		self.sliceLengthUpdate()
		N = []
		r = len(m) % self.sliceLength
			# r is how many extra null digits we have to add to the string for
			# it to be sliced into even parts.
		if not(r % 3 == 0):
			print("\n*************\nDifference of slice length and message length is not divisble by 3 in slice function!\n*************\n")
		
				# Add "NULL" characters to the end of the string so that the message
				# can be sliced into even lengths of sliceLength
		if r > 0:
			r = self.sliceLength - r
			while r > 0:
				m = m +"000"
				r = r - 3
			# We make sure that the string has length divisible by 3
		if not(len(m) % 3 == 0):
			print("\n*************\nlen(m) in slice should be divisible by 3, this should have happened in while function above in slice\n*************\n")
		numSlices = int(len(m) / self.sliceLength)
		for counter in range(numSlices):
			N.append(m[counter * self.sliceLength : (counter + 1) * self.sliceLength])
		return(N)
	
		# given an array of strings, join them into one long string
	def unSlice(self, M):
		m = ""
		for i in range(len(M)):
			m = m + M[i]
		return(m)
	
		# Returns a string n that is the ASCII numbers of the message m
	def OutOfASCII(self, m):
		n = ""
		for i in range(len(m)):
			tmp = str(ord(m[i]))
			while len(tmp) < 3:
				tmp = "0" +tmp
			n = n +tmp
		return(n)
	
		# converts a string of digits into a string of characters
	def InToASCII(self, n):
		m = ""
		if not(len(n) % 3 == 0):
			print("\n**************\nString of numberd should be a multpile of 3 long in InToASCII, adding 0s so that it is\n***********\n")
			while not(len(n) % 3 == 0):
				n = "0" + n
		for i in range( int(len(n)/3) ):
			ASCIInumber = int(n[3*i : 3*(i+1)])
			tmp = chr( ASCIInumber)
			m = m +tmp
		return(m)
	
	def sliceLengthUpdate(self):
		self.sliceLength = len(str(self.phiN)) - 1
			# Making sliceLength divisible by 3 because each character will be converted
			# into a 3 digit number
		r = self.sliceLength % 3
		self.sliceLength = self.sliceLength - r
		if (self.sliceLength <= 0):
			print("\n*************\nphiN is too small to encrypt!\n Re-Generate a larger key\n**************\n")
	
	def setPublicKey(self, e, phiN):
		self.e = e
			# If we are setting public key then we don't know n, p or q
		self.n = 1
		self.p = 1
		self.q = 1
			# if the current private key isn't actually the private key set it to 0
		if not(self.e * self.d % self.phiN == 1 and self.phiN == phiN):
			self.d = 1
			self.phiN = phiN
			self.privateKeyFlag = False
		self.publicKeyFlag = True
	
	def setPrivateKey(self, d, phiN):
		self.d = d
			# If we are setting the private key then we don't know n, p or q
		self.n = 1
		self.p = 1
		self.q = 1
			# If the public key isn't the associated public key delete it
		if not(self.e * self.d % self.phiN == 1 and self.phiN == phiN):
			self.e = 1
			self.phiN = phiN
			self.publicKeyFlag = False
		self.privateKeyFlag = True
	
	def test(self):
		while True:
			print("*************************")
			print("\nType what would you like to test?\nNote: To test encrypt / decrypt, you must generate / set the private or public keys")
			choice = input("\nisPrime, randomPrime, generatePandQ, modInverse, generateNewKey, gcd, slice, OutOfASCII, InToASCII, encrypt, decrypt, setPublicKey, setPrivateKey or EXIT?\n")
			if choice == "isPrime":
				n = int(input("\nWhat number do you want to check is Prime?\n p ="))
				if self.isPrime(n):
					print(str(n) +" is a prime")
				else:
					print(str(n) +" is not a prime")
			elif choice == "randomPrime":
				a = int(input("\nWhat is the min possible prime? Note: min > 0 and min - max > " +str(self.minRange) +"\n min = "))
				b = int(input("And below what number?\n max = "))
				print("we found prime p = " +str(self.randomPrime(a,b)))
			elif choice == "generatePandQ":
				self.min = int(input("\nWhat is min possible p,q? Note: min > 0, and min - max > " +str(self.minRange) +"\n min = "))
				self.max = int(input("What is max possible p,q?\n max = "))
				self.generatePandQ()
				print("p = " +str(self.p) +"\nq = " +str(self.q) +"\n")
			elif choice == "modInverse":
				print("\n\n*********\nNumbers you provide must be coprime!")
				print("0 < a < m, gcd(a, m) = 1\n*********\n\n")
				a = int(input("Find the inverse of what number?\n a = "))
				m = int(input("In what modulous?\n m = "))
				[b,g] = self.modInverse(a,m)
				if g == 1:
					print("Inverse b = " +str(b) +"\n")
					print("= a * b mod(n)\n= " +str(a) +" * " +str(b) +" = " +str((a*b)%m) +" mod(" +str(m) +")\n")
				else:
					print("gcd(a,m) has to equal 1, but")
					print("gcd(" +str(a) +"," +str(m) +") = " +str(g))
			elif choice == "generateNewKey":
				print("\nWhat range would you like the primes to be in?")
				print("Note: let min > 512 then the classic public key can be chosen")
				print("0 < min < max, max - min > " +str(self.minRange))
				min = int(input("min = "))
				max = int(input("max = "))
				self.generateNewKey(min, max)
				self.printKeyDetails()
			elif choice == "gcd":
				print("\nWhat two numbers would you like to find the greatest common devisor?")
				a = int(input("a < b\na = "))
				b = int(input("b = "))
				print("gcd(" +str(a) +", " +str(b) +") = " +str(self.modInverse(a,b)[1]))
			elif choice == "slice":
				print("\nWhat message would you like to slice?\n")
				n = input("m = ")
				print("m = " +n)
				print("len(m) = " +str(len(n)))
				slice = int(input("How long would you like each slice to be?\nslice must be divisible by 3\n sliceLength = "))
				self.phiN = 10 ** slice
				print("slice Length should be 1 less than length of phiN\nphiN = " +str(self.phiN))
				N = self.slice(n)
				print("m = " +n)
				print("m sliced:")
				for i in range(len(N)):
					print(N[i])
			elif choice == "OutOfASCII":
				print("\nWhat message would you like to see in ASCII numbers?\n")
				m = input("m = ")
				n = self.OutOfASCII(m)
				print("m in ASCII code:")
				print(n)
				print("\n*************")
			elif choice == "InToASCII":
				print("\nWhat message would you like to see using ASCII numbers?\n")
				n = input("n = ")
				m = self.InToASCII(n)
				print("n in ASCII characters:")
				print(m)
				print("\n*************")
			elif choice == "encrypt":
				print("\nWhat message would you like to encrypt?\n")
				m = input("m = ")
				cryptN = self.encrypt(m)
				print("Message encrypted:")
				for i in range(len(cryptN)):
					print(cryptN[i])
			elif choice == "decrypt":
				print("\nWhat message would you like to decrypt? It has to be input as digits in an array\n")
				cryptLen = input("How long is the array?\nlen(cryptN) = ")
				cryptN = []
				for i in range( int( cryptLen ) ):
					print("Entry " +str(i + 1) +":")
					cryptN.append( input("") )
				m = self.decrypt(cryptN)
				print("Message decrypted = " +m)
			elif choice == "setPublicKey":
				print("\nWhat would you like to set the public key to?\n")
				e = int( input("e = ") )
				print("What would you like to set phiN to?\nNote: phiN > e")
				phiN = int( input("phiN = ") )
				self.setPublicKey(e, phiN)
				self.printKeyDetails()
			elif choice == "setPrivateKey":
				print("\nWhat would you like to set the private key to?\n")
				d = int( input("d = ") )
				print("What would you like to set phiN to?\nNote: phiN > d")
				phiN = int( input("phiN = ") )
				self.setPrivateKey(d, phiN)
				self.printKeyDetails()
			elif choice == "EXIT":
				return(0)
			else:
				print("\n***********\nCould not read your input. You have to type the input exactly.")
				print("For example: \ngenerateNewKey\n or:\nisPrime\n") 
	
	

key = keyGenerator()
key.test()

