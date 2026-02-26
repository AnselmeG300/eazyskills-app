terraform { 
  cloud { 
    
    organization = "EAZYTraining-Services-Infrastucture" 

    workspaces { 
      name = "eazyskills-app" 
    } 
  } 
}