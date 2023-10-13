
import { tryParse } from "./tryParse"
export const defaultCompany = (id) => {

    const companyId = id

    let companies = tryParse(localStorage.getItem('companies'))
    // console.log(companies)
    let userCompany = companies.filter(company => company.id === companyId)
    console.log(userCompany)

   
    return {
      value: userCompany[0].id,
      label: userCompany[0].name
    }

  }

  export   const defaultBranch =(id) =>{
    const branchId =  id//user.person.sub_entity
    console.log(branchId)
    let branches = tryParse(localStorage.getItem('branches'))
    // console.log(branches)
    let userBranch = branches.filter(branch=>branch.pk === branchId)
    


    return {
      value: userBranch[0].pk,
      label: userBranch[0].fields.branch_name
    }
  }