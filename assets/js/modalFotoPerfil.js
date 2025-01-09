document.addEventListener('DOMContentLoaded', ()=> {
    const modal = document.getElementById('modal-foto-perfil');
    const fecharModal = modal.querySelector('.fechar');

    //função para fechar o modal clicando no x
    fecharModal.onclick = () => {
        modal.style.display='none';
    };


})