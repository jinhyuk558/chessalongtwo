
export const generateHeadingText = (players, playingAs) => {
  let headingText = ''
  const white = players.white
  const black = players.black
  if (playingAs === white.user.name) {
    //console.log( `${playingAs} (${white.rating}) vs ${black.user.name} (${black.rating}))`)
    headingText = `${playingAs} (${white.rating}) vs ${black.user.name} (${black.rating})`
  } else {
    headingText = `${playingAs} (${black.rating}) vs ${white.user.name} (${white.rating})`
  }
  return headingText
}


export const generateWinnerText = (players, winner) => {
  const white = players.white
  const black = players.black
  const winnerText = winner ? 
    `${winner === 'white' ? white.user.name : black.user.name}` : 
    'draw'
  return winnerText
}

