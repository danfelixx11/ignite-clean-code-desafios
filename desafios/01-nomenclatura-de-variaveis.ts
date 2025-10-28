// Nomenclatura de variáveis

const githubPopularityCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function findGithubUserCategory(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const githubUserData = await response.json()

  const sortedCategories = githubPopularityCategories.sort((categoryA, categoryB) =>  categoryB.followers - categoryA.followers); 

  const matchingCategory = sortedCategories.find(category => githubUserData.followers > category.followers)

  const userProfile = {
    github: username,
    category: matchingCategory.title
  }

  return userProfile;
}

findGithubUserCategory({ query: {
  username: 'josepholiveira'
}}, {})