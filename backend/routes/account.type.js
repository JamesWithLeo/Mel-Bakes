export const checkAccountType = async (req, res, next) => {
  if (req.params.type === 'admin') {
    res.send(`login/:type =  ${req.params.type}. Your are admin`);
  }
  else {
    res.send('you are not admin');
  }
}