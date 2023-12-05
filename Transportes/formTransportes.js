const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sMatricula = document.querySelector('#m-matricula');
const sNomeEmpresa = document.querySelector('#m-nomeEmpresa');
const sEndereco = document.querySelector('#m-endereco')
const sContato = document.querySelector('#m-contato')

let itens
let id

function openModal(edit = false, index = 0) {
        modal.classList.add('active')

        modal.onclick = e => {
            if (e.target.className.indexOf('modal-container') !== -1){
                modal.classList.add('active')
            }
        }

        if (edit) {
            sNome.value = itens[index].nome
            sFuncao.value = itens[index].funcao
            sSalario.value = itens[index].salario
            id = index
          } else {
            sNome.value = ''
            sFuncao.value = ''
            sSalario.value = ''
          }
          
        }
        
        function editItem(index) {
        
          openModal(true, index)
        }
        
        function deleteItem(index) {
          itens.splice(index, 1)
          setItensBD()
          loadItens()
        }
        
        function insertItem(item, index) {
          let tr = document.createElement('tr')
        
          tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.funcao}</td>
            <td>R$ ${item.salario}</td>
            <td class="acao">
              <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
            </td>
            <td class="acao">
              <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
          `
          tbody.appendChild(tr)
        }
        
        btnSalvar.onclick = e => {
          
          if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
            return
          }
        
          e.preventDefault();
        
          if (id !== undefined) {
            itens[id].nome = sNome.value
            itens[id].funcao = sFuncao.value
            itens[id].salario = sSalario.value
          } else {
            itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
          }
        
          setItensBD()
        
          modal.classList.remove('active')
          loadItens()
          id = undefined
        }
        
        function loadItens() {
          itens = getItensBD()
          tbody.innerHTML = ''
          itens.forEach((item, index) => {
            insertItem(item, index)
          })
        
        }
        
        const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
        const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
        
        loadItens()